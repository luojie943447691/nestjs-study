import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Log } from './src/logs/entities/log.entity';
import { Profile } from './src/profile/entities/profile.entity';
import { Role } from './src/roles/entities/role.entity';
import { User } from './src/user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { DatabaseEnum } from './src/enum/enum.config';
function getEnv(env: string) {
  console.log('env', env);
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env));
  }

  return {};
}

function getConnectParameters() {
  const defaultConfig = getEnv('.env');
  const envConfig = getEnv(`.env.${process.env.NODE_ENV ?? `development`}`);
  const config = { ...defaultConfig, ...envConfig };

  const entitiesDir =
    process.env.NODE_ENV === 'development'
      ? [__dirname + '/src/**/entities/*.entity.{js,ts}']
      : [__dirname + '/src/**/entities/*.entity.{js,ts}'];

  return {
    type: config[DatabaseEnum.DB_TYPE],
    host: config[DatabaseEnum.DB_HOST],
    port: config[DatabaseEnum.DB_PORT],
    username: config[DatabaseEnum.DB_USERNAME],
    password: config[DatabaseEnum.DB_PASSWORD],
    database: config[DatabaseEnum.DB_DATABASE],
    // 同步本地的 schema -> 数据库 ，一般是初始化使用
    synchronize: config[DatabaseEnum.DB_SYNC],
    logging: false,
    // logging: ['error', 'warn'],
    entities: entitiesDir,
    retryAttempts: Infinity,
  } as unknown as TypeOrmModuleOptions;
}

export const connectionParams = getConnectParameters();

export default new DataSource({
  ...connectionParams,
  migrations: ['src/migration/*.js'],
  subscribers: [],
} as DataSourceOptions);
