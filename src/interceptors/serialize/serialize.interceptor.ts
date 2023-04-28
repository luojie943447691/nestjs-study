import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('这里在拦截器执行之前');

    return next.handle().pipe(
      map((data) => {
        console.log('这里在拦截器执行之后');

        return data;
      }),
    );
  }
}
