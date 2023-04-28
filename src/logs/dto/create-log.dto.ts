import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateLogDto {
  @IsString()
  path: string;
  @IsString()
  method: string;
  @IsString()
  data: string;
  @IsString()
  result: string;

  user: User;
}
