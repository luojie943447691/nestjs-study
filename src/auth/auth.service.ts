import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  signin(username: string, password: string) {
    return this.userService.findByUsername(username);
  }
  signup(username: string, password: string) {
    const res = this.userService.create({
      username,
      password,
    });
    return res;
  }
}
