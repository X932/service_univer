import { RpcException } from '@nestjs/microservices';

export type SignUpResponse = { message: string } | RpcException;

export interface ISignUpUser {
  name: string;
  surname: string;
  nickname: string;
  password: string;
  groupId: number;
  departmentId: number;
}
