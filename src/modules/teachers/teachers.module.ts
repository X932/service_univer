import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersEntity } from './entities/teachers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeachersEntity])],
})
export class TeachersModule {}
