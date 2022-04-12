import { RpcException } from '@nestjs/microservices';

interface ISuccessSignUp {
  userId: number;
  message: string;
}

export type SignUpResponse = ISuccessSignUp | RpcException;

interface ISuccessSignIn {
  message: string;
  token: string;
}

export type SignInResponse = ISuccessSignIn | RpcException;

export interface ISignUpUser {
  name: string;
  surname: string;
  nickname: string;
  password: string;
  groupId: number;
  departmentId: number;
  roleId: number;
}

export interface IAuthorization {
  nickname: string;
  password: string;
}
