import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
  ValidationArguments,
} from 'class-validator';

export class SigninAuth {
  @Matches(/^[\d\w]+$/, {
    message: '账号只能包含数字和字母',
  })
  @Length(6, 20, {
    message: `账号长度应该在$constraint1到$constraint2之间，实际接受到的数据是 $value`,
  })
  @IsString({ message: '账号必须要是合法字符串' })
  @IsNotEmpty({ message: '账号不能为空' })
  username: string;

  @Matches(/^[\d\w\.!,]+$/, {
    message: '密码只能包含数字 字母 . ! ,',
  })
  @Length(6, 20, {
    message: `密码长度应该在$constraint1到$constraint2之间，实际接受到的数据是 $value`,
  })
  @IsString({ message: '密码必须要是合法字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
