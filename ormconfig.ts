import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Log } from 'src/logs/entities/log.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/user/entities/user.entity';

export default {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'example',
  database: 'testdb',
  // 同步本地的 schema -> 数据库 ，一般是初始化使用
  synchronize: true,
  logging: false,
  // logging: ['error', 'warn'],
  entities: [User, Profile, Log, Role],
} as TypeOrmModuleOptions;
