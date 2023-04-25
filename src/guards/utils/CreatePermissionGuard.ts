import { CanActivate, ExecutionContext, Type } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

export function CreatePermissionGuard(...roles: string[]) {
  return class PermissionGuard implements CanActivate {
    constructor(public userService: UserService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const http = context.switchToHttp();
      const req = http.getRequest<Request>();
      const user = await this.userService.findByUsername(req.user['username']);
      // 是否包含指定人员
      if (user && user.roles?.find((d) => d.id === 1)) {
        return true;
      }
      return true;
    }
  };
}
