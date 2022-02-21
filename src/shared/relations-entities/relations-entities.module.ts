import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersDepartmentsEntity } from '@relations-entities/users-departments.relation';
import { UsersRatingsEntity } from '@relations-entities/users-ratings.relation';
import { UsersGroupsEntity } from '@relations-entities/users-groups.relation';
import { DepartmentsGroupsEntity } from '@relations-entities/departments-groups.relation';
import { SubjectsRatingsEntity } from '@relations-entities/subjects-ratings.relation';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersDepartmentsEntity,
      UsersRatingsEntity,
      UsersGroupsEntity,
      DepartmentsGroupsEntity,
      SubjectsRatingsEntity,
    ]),
  ],
})
export class RelationsEntitiesModule {}
