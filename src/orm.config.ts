import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config = getConfig();

function getConfig() {
  const conf: TypeOrmModuleOptions = {
    type: 'postgres',
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
  };
  return conf;
}