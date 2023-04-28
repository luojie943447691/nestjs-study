import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor();
  constructor(dto: any);
  constructor(private dto?: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('这里在拦截器执行之前');

    return next.handle().pipe(
      map((data) => {
        console.log('这里在拦截器执行之后');
        if (this.dto) {
          return plainToInstance(this.dto, data, {
            excludeExtraneousValues: true,
          });
        }
        return data;
      }),
    );
  }
}
