import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RatingsEntity } from './entities/ratings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RatingsEntity])],
})
export class RatingsModule {}
