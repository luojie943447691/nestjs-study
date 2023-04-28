import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateLogDto {
  @IsString()
  path: string;
  @IsString()
  method: string;
  @IsString()
  @Expose()
  data: string;
  @IsString()
  @Expose()
  result: string;

  user: User;
}
