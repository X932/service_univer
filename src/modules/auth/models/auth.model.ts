import { RpcException } from '@nestjs/microservices';

export type SignUpResponse = { message: string } | RpcException;
export type SignInResponse = { message: string; token: string } | RpcException;

export interface ISignUpUser {
  name: string;
  surname: string;
  nickname: string;
  password: string;
  groupId: number;
  departmentId: number;
}

export interface IAuthorization {
  nickname: string;
  password: string;
}
