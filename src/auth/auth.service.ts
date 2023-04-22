import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signin(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    if (username && password === user.password) {
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
