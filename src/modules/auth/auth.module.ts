import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsEntity } from '@modules/departments/entities/departments.entity';
import { GroupsEntity } from '@modules/groups/entities/groups.entity';
import { UsersEntity } from '@modules/users/entities/users.entity';
import { UsersDepartmentsEntity } from '@relations-entities/users-departments.relation';
import { UsersGroupsEntity } from '@relations-entities/users-groups.relation';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      UsersDepartmentsEntity,
      DepartmentsEntity,
      UsersGroupsEntity,
      GroupsEntity,
    ]),
  ],
})
export class AuthModule {}
