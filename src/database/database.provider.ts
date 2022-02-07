import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseProvider: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'univer',
  autoLoadEntities: true,
  synchronize: true,
};
