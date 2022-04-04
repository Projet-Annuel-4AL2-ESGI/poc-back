import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// export const config: TypeOrmModuleOptions = {
//   type: 'postgres',
//   username: 'fjwufefmvafgrc',
//   password: 'a5b909c3442fdcc46150a8fd8ee99bb35022a932c0195a538c66f65b1db2a2e7',
//   port: 5432,
//   host: 'ec2-99-80-170-190.eu-west-1.compute.amazonaws.com',
//   database: 'd6gg3357g0fds0',
//   synchronize: true,
//   ssl: { rejectUnauthorized: false },
//   entities: ['dist/**/*.entity{.ts,.js}'],
// };
export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  ssl: { rejectUnauthorized: false },
  entities: ['dist/**/*.entity{.ts,.js}'],
};
