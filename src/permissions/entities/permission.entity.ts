import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 编码
   */
  @Column()
  code: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
