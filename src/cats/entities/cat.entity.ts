import { IsString, IsInt } from 'class-validator';
export class Cat {
  @IsString()
  id?: number;
  @IsString()
  name: string;
  @IsInt()
  age: number;
  @IsString()
  breed: string;
}
