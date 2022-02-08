import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsEntity } from './entities/groups.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupsEntity])],
})
export class GroupsModule {}
