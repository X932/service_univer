import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from '@modules/users/entities/users.entity';
import { throwBadRequest } from '@errors/throw-bad-request';
import { ResponseStatuses } from '@constants/response-statuses';
import { SignUpResponse, ISignUpUser } from './models/auth.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  private async getUserByNickname(
    nickname: string,
  ): Promise<UsersEntity | undefined> {
    const user = await this.usersRepository.findOne({ nickname });
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  public async signUp(user: ISignUpUser): Promise<SignUpResponse> {
    const userEntity = await this.getUserByNickname(user.nickname);

    if (userEntity) {
      throwBadRequest(ResponseStatuses.BAD_REQUEST.description);
    }
    const hashedPassword: string = await this.hashPassword(user.password);
    const row: ISignUpUser = {
      ...user,
      password: hashedPassword,
    };

    await this.usersRepository.save(row);
    return { message: ResponseStatuses.OK.description };
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  public async signIn() {}
}
