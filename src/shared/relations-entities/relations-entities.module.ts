import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersDepartmentsEntity } from '@relations-entities/users-departments.relation';
import { UsersSubjectsEntity } from '@relations-entities/users-subjects.relation';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersDepartmentsEntity, UsersSubjectsEntity]),
  ],
})
export class RelationsEntitiesModule {}
