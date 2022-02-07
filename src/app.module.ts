import { databaseProvider } from '@database/database.provider';
import { DepartmentsModule } from '@modules/departments/departments.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseProvider),
    DepartmentsModule,
  ],
})
export class AppModule {}
