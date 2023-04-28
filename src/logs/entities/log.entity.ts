import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  path: string;
  @Column()
  method: string;
  @Column()
  data: string;
  @Column()
  @Expose()
  result: string;

  @ManyToOne(() => User, (user) => user.logs)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
