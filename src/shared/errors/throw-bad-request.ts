import { ResponseStatuses } from '@constants/response-statuses';
import { RpcException } from '@nestjs/microservices';

export function throwBadRequest(message: string): void {
  throw new RpcException({
    message,
    code: ResponseStatuses.BAD_REQUEST.code,
  });
}
