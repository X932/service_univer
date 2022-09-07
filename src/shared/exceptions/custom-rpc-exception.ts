import { RpcException } from '@nestjs/microservices';

export class CustomRpcException extends RpcException {
  public statusCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    super({ message, statusCode });
    this.statusCode = statusCode;
    this.message = message;
  }
}
