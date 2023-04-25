import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Permission } from 'src/permissions/entities/permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable()
  permissions: Permission[];
}
