import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePermissionDto {
  @Length(2, 30, {
    message: `编码长度应该在$constraint1到$constraint2之间`,
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}
