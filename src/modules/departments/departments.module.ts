import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DepartmentsEntity } from './entities/departments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentsEntity])],
})
export class DepartmentsModule {}
