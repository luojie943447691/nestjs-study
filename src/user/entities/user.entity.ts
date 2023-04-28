import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Log } from '../../logs/entities/log.entity';
import { Role } from '../../roles/entities/role.entity';
import { Profile } from '../../profile/entities/profile.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  // 主键 id
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ name: 'username', type: 'varchar', length: 100 })
  username: string;

  @Column({ name: 'password', type: 'varchar', length: 100 })
  @Exclude()
  password: string;

  // 这里需要好好理解一下 OneToMany 的第二个参数
  // 这里是告诉 typescript ，去 log 里面去找 user，user 才是真正建立起关系的数据
  //   因此数据库里面需要有一个 userId，故在 user 上多了个 @JoinColumn 装饰器。
  //   typeorm 会尝试将 userId 等于 当前User对象id的数据给集中起来，赋值给当前User对象中的 logs 字段
  // 本质其实是建立起来 typescript和数据库 之间的联系
  @OneToMany(() => Log, (log) => log.user)
  logs: Log[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
}
