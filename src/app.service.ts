import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getSudents(str: string): string {
    return str + ' - service 222';
  }
}
