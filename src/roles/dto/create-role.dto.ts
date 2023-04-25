import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Permission } from '../../permissions/entities/permission.entity';
export class CreateRoleDto {
  @Length(2, 10, {
    message: `角色名称长度应该在$constraint1到$constraint2之间`,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  permissions: Permission[] | number[];
}
