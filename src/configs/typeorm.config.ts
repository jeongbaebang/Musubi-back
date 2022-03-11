import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'pgbdbs.cbqolkgr2zgd.ap-northeast-2.rds.amazonaws.com',
  port: 3306,
  username: 'PGBadmin',
  password: 'PGBadmin!234',
  database: 'test',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
