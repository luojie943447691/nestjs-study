import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const user = await this.userService.findByUsername(req.user['username']);
    // 管理员
    if (user && user.roles?.find((d) => d.id === 1)) {
      return true;
    }

    return false;
  }
}
