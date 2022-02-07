import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseProvider: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'univer',
  synchronize: true,
};

// POSTGRES_HOST=127.0.0.1
// POSTGRES_PORT=5432
// POSTGRES_USER=postgres
// POSTGRES_PASSWORD=password
// POSTGRES_DATABASE=univer
