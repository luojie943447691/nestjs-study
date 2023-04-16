import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { validateRequest } from './validateRequest';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    // const _class = context.getClass<T>();
    console.log(
      'this.reflector',
      this.reflector.get<string[]>('roles', context.getHandler()),
    );

    return validateRequest(request);
  }
}
