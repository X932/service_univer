import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsEntity } from './entities/subjects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectsEntity])],
})
export class SubjectsModule {}
