import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersDepartmentsEntity } from '@relations-entities/users-departments.relation';
import { UsersRatingsEntity } from '@relations-entities/users-ratings.relation';
import { UsersGroupsEntity } from '@relations-entities/users-groups.relation';
import { UsersRolesEntity } from '@relations-entities/users-roles.relation';
import { DepartmentsGroupsEntity } from '@relations-entities/departments-groups.relation';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersDepartmentsEntity,
      UsersRatingsEntity,
      UsersGroupsEntity,
      UsersRolesEntity,
      DepartmentsGroupsEntity,
    ]),
  ],
})
export class RelationsEntitiesModule {}
