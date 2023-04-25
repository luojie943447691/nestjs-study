import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import 'reflect-metadata';
import { UserService } from '../user.service';
import { Request } from 'express';

@Injectable()
export class UpdateUserGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 查询出当前登录人员的信息
    const req = context.switchToHttp().getRequest<Request>();
    const loginUser = await this.userService.findByUsername(
      req.user['username'],
    );
    // 查询出修改人员的信息
    const updateUser = await this.userService.findByUsername(
      req.body['username'],
    );

    // 如果不是管理员，则只能当前登录人员自己的信息
    // 如果是管理员，则都能修改
    if (loginUser && updateUser) {
      // 管理员
      if (loginUser.roles?.find((d) => d.id === 1)) {
        return true;
      }
      // 自己
      if (updateUser.id === loginUser.id) {
        return true;
      }
    }

    return false;
  }
}
