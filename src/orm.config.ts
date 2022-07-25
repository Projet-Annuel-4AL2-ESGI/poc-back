import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config = getConfig();

function getConfig() {
  if (process.env.PORT === undefined) {
    const conf: TypeOrmModuleOptions = {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    };
    return conf;
  } else {
    const conf: TypeOrmModuleOptions = {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      ssl: { rejectUnauthorized: false },
      entities: ['dist/**/*.entity{.ts,.js}'],
    };
    return conf;
  }
}