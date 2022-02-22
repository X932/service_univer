import { RpcException } from '@nestjs/microservices';

export type SignUpResponse = { message: string } | RpcException;

export interface ISignUpUser {
  id?: number;
  name: string;
  surname: string;
  nickname: string;
  password: string;
  groupId?: number;
  departmentId?: number;
}
