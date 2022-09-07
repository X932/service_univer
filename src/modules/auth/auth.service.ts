import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from '@modules/users/entities/users.entity';
import { ResponseStatuses } from '@constants/response-statuses';
import { UsersDepartmentsEntity } from '@relations-entities/users-departments.relation';
import { DepartmentsEntity } from '@modules/departments/entities/departments.entity';
import { UsersGroupsEntity } from '@relations-entities/users-groups.relation';
import { GroupsEntity } from '@modules/groups/entities/groups.entity';
import { JwtService } from '@nestjs/jwt';
import { CustomRpcException } from '@exceptions/custom-rpc-exception';
import {
  SignUpResponse,
  ISignUpUser,
  IAuthorization,
  SignInResponse,
} from './models/auth.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
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
        throw new CustomRpcException(
          ResponseStatuses.DEPARTMENT_NOT_FOUND.code,
          ResponseStatuses.DEPARTMENT_NOT_FOUND.description,
        );
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
        throw new CustomRpcException(
          ResponseStatuses.GROUP_NOT_FOUND.code,
          ResponseStatuses.GROUP_NOT_FOUND.description,
        );
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
      throw new CustomRpcException(
        ResponseStatuses.BAD_REQUEST.code,
        ResponseStatuses.BAD_REQUEST.description,
      );
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
    const { id } = await this.getUserByNickname(userCredentials.nickname);
    return {
      message: ResponseStatuses.OK.description,
      userId: id,
    };
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  private createJwt(userId: number): string {
    const payload = { sub: userId };
    return this.jwtService.sign(payload);
  }

  public async signIn(user: IAuthorization): Promise<SignInResponse> {
    const userEntity = await this.getUserByNickname(user.nickname);

    if (!userEntity) {
      throw new CustomRpcException(
        ResponseStatuses.BAD_REQUEST.code,
        ResponseStatuses.BAD_REQUEST.description,
      );
    }

    const isPasswordValid = await this.comparePassword(
      user.password,
      userEntity.password,
    );

    if (isPasswordValid) {
      const token: string = this.createJwt(userEntity.id);
      return { message: ResponseStatuses.OK.description, token };
    }

    throw new CustomRpcException(
      ResponseStatuses.BAD_REQUEST.code,
      ResponseStatuses.BAD_REQUEST.description,
    );
  }
}
