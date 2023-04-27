import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signin(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    // 密码是否相同
    const isSame = await argon2.verify(user.password, password);

    if (isSame) {
      // 签名
      return await this.jwtService.sign({ username, sub: user.id });
    }
    // 否则就是不正确的
    throw new UnauthorizedException('账号或者密码不正确');
  }
  signup(username: string, password: string) {
    const res = this.userService.create({
      username,
      password,
    });
    return res;
  }
}
