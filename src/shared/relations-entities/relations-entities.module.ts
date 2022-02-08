import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersDepartmentsEntity } from './users-departments.relation';

@Module({
  imports: [TypeOrmModule.forFeature([UsersDepartmentsEntity])],
})
export class RelationsEntitiesModule {}
