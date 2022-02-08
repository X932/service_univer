import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersDepartmentsEntity } from '@relations-entities/users-departments.relation';
import { UsersSubjectsEntity } from '@relations-entities/users-subjects.relation';
import { UsersRatingsEntity } from '@relations-entities/users-ratings.relation';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersDepartmentsEntity,
      UsersSubjectsEntity,
      UsersRatingsEntity,
    ]),
  ],
})
export class RelationsEntitiesModule {}
