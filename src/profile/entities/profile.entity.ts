import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: 1 })
  gender: number;
  @Column({ default: '重庆市' })
  address: string;
  @Column({ type: 'blob', nullable: true })
  @Exclude()
  avatar: Buffer;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
