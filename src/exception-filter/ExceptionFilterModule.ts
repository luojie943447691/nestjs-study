import { Module } from '@nestjs/common';
import { HttpExceptionFilter } from './HttpExceptionFilter';

@Module({
  providers: [HttpExceptionFilter],
  exports: [HttpExceptionFilter],
})
export class ExceptionFilterModule {}
