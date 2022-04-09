import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MessagePatterns } from 'types-univer';
import { AuthService } from './auth.service';
import {
  SignUpResponse,
  ISignUpUser,
  IAuthorization,
  SignInResponse,
} from './models/auth.model';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern(MessagePatterns.Auth.signUp)
  signUp(user: ISignUpUser): Promise<SignUpResponse> {
    return this.authService.signUp(user);
  }

  @MessagePattern(MessagePatterns.Auth.signIn)
  signIn(user: IAuthorization): Promise<SignInResponse> {
    return this.authService.signIn(user);
  }
}
