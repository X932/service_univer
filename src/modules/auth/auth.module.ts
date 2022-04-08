import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsEntity } from '@modules/departments/entities/departments.entity';
import { GroupsEntity } from '@modules/groups/entities/groups.entity';
import { UsersEntity } from '@modules/users/entities/users.entity';
import { UsersDepartmentsEntity } from '@relations-entities/users-departments.relation';
import { UsersGroupsEntity } from '@relations-entities/users-groups.relation';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY } from '@constants/jwt-key';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    JwtModule.register({ secret: JWT_KEY, signOptions: { expiresIn: '1d' } }),
    TypeOrmModule.forFeature([
      UsersEntity,
      UsersDepartmentsEntity,
      DepartmentsEntity,
      UsersGroupsEntity,
      GroupsEntity,
    ]),
  ],
})
export class AuthModule {}
