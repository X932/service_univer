import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from '@modules/users/entities/users.entity';
import { throwBadRequest } from '@errors/throw-bad-request';
import { ResponseStatuses } from '@constants/response-statuses';
import { UsersDepartmentsEntity } from '@relations-entities/users-departments.relation';
import { DepartmentsEntity } from '@modules/departments/entities/departments.entity';
import { UsersGroupsEntity } from '@relations-entities/users-groups.relation';
import { GroupsEntity } from '@modules/groups/entities/groups.entity';
import { SignUpResponse, ISignUpUser } from './models/auth.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @InjectRepository(DepartmentsEntity)
    private departmentsRepository: Repository<DepartmentsEntity>,
    @InjectRepository(GroupsEntity)
    private groupsRepository: Repository<GroupsEntity>,
  ) {}

  private async getUserByNickname(
    nickname: string,
  ): Promise<UsersEntity | undefined> {
    const user = await this.usersRepository.findOne({ nickname });
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  private async createRelations(
    user: UsersEntity,
    userCredentials: ISignUpUser,
  ) {
    await getConnection().transaction(async (transactionalEntityManager) => {
      const savedUser = await transactionalEntityManager.save<UsersEntity>(
        user,
      );
      const department = await this.departmentsRepository.findOne({
        id: userCredentials.departmentId,
      });
      if (!department) {
        throwBadRequest(ResponseStatuses.DEPARTMENT_NOT_FOUND.description);
      }
      const userDepartmentRelation = new UsersDepartmentsEntity();
      userDepartmentRelation.department = department;
      userDepartmentRelation.user = savedUser;
      await transactionalEntityManager.save<UsersDepartmentsEntity>(
        userDepartmentRelation,
      );

      const group = await this.groupsRepository.findOne({
        id: userCredentials.groupId,
      });
      if (!group) {
        throwBadRequest(ResponseStatuses.GROUP_NOT_FOUND.description);
      }
      const userGroupRelation = new UsersGroupsEntity();
      userGroupRelation.group = group;
      userGroupRelation.user = user;
      await transactionalEntityManager.save<UsersGroupsEntity>(
        userGroupRelation,
      );
    });
  }

  public async signUp(userCredentials: ISignUpUser): Promise<SignUpResponse> {
    const userEntity = await this.getUserByNickname(userCredentials.nickname);

    if (userEntity) {
      throwBadRequest(ResponseStatuses.BAD_REQUEST.description);
    }
    const hashedPassword: string = await this.hashPassword(
      userCredentials.password,
    );
    const user: UsersEntity = new UsersEntity();
    user.name = userCredentials.name;
    user.surname = userCredentials.surname;
    user.nickname = userCredentials.nickname;
    user.password = hashedPassword;

    await this.createRelations(user, userCredentials);
    return { message: ResponseStatuses.OK.description };
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
