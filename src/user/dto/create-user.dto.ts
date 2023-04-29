import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Profile } from '../../profile/entities/profile.entity';
import { Role } from '../../roles/entities/role.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    // message: (args: ValidationArguments) => {
    //   const value = args.value;
    //   const [min, max] = args.constraints;
    //   if (value.length < min) {
    //     return `账号长度至少是${min}`;
    //   } else {
    //     return `账号长度最多是${max}`;
    //   }
    // },
    message: `账号长度应该在$constraint1到$constraint2之间`,
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  roles: Role[] | number[];

  profile: Profile;
}
