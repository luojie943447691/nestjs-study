import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { User } from '../../user/entities/user.entity';

export class CreateProfileDto {
  @IsNumberString()
  gender: number | string;

  @IsString()
  address: string;

  @IsNotEmpty()
  user: User | number;
}
