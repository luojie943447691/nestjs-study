import { Global, Logger, Module } from '@nestjs/common';
import { HttpExceptionFilter } from './exception-filter/HttpExceptionFilter';

const httpexceptionFilterProvider = {
  provide: HttpExceptionFilter,
  useClass: HttpExceptionFilter,
};
@Global()
@Module({
  providers: [httpexceptionFilterProvider, Logger],
  exports: [httpexceptionFilterProvider, Logger],
})
export class GlobalModule {}
