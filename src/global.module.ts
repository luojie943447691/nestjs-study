import { Global, Module } from '@nestjs/common';
import { HttpExceptionFilter } from './exception-filter/HttpExceptionFilter';

const httpexceptionFilterProvider = {
  provide: HttpExceptionFilter,
  useClass: HttpExceptionFilter,
};
@Global()
@Module({
  providers: [httpexceptionFilterProvider],
  exports: [httpexceptionFilterProvider],
})
export class GlobalModule {}
