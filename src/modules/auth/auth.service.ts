import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    @InjectRepository(UsersDepartmentsEntity)
    private usersDepartmentsRepository: Repository<UsersDepartmentsEntity>,
    @InjectRepository(DepartmentsEntity)
    private departmentsRepository: Repository<DepartmentsEntity>,
    @InjectRepository(UsersGroupsEntity)
    private usersGroupsRepository: Repository<UsersGroupsEntity>,
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

  private async createRelationUserDepartment(
    user: UsersEntity,
    departmentId: number,
  ) {
    const department = await this.departmentsRepository.findOne({
      id: departmentId,
    });
    const userDepartmentRelation = new UsersDepartmentsEntity();

    userDepartmentRelation.department = department;
    userDepartmentRelation.user = user;
    await this.usersDepartmentsRepository.save(userDepartmentRelation);
  }

  private async createRelationUserGroup(user: UsersEntity, groupId: number) {
    const group = await this.groupsRepository.findOne({
      id: groupId,
    });
    const userGroupRelation = new UsersGroupsEntity();

    userGroupRelation.group = group;
    userGroupRelation.user = user;
    await this.usersGroupsRepository.save(userGroupRelation);
  }

  public async signUp(user: ISignUpUser): Promise<SignUpResponse> {
    const userEntity = await this.getUserByNickname(user.nickname);

    if (userEntity) {
      throwBadRequest(ResponseStatuses.BAD_REQUEST.description);
    }
    const hashedPassword: string = await this.hashPassword(user.password);
    const row: ISignUpUser = {
      ...user,
      password: hashedPassword,
    };
    delete row.departmentId;
    delete row.groupId;

    const savedUser = await this.usersRepository.save(row);
    await this.createRelationUserDepartment(savedUser, user.departmentId);
    await this.createRelationUserGroup(savedUser, user.groupId);
    return { message: ResponseStatuses.OK.description };
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  public async signIn() {}
}
