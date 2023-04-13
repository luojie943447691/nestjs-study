import { Module } from '@nestjs/common';
import { LoggerHelper } from './LogHelper';

const versionProvider = {
  useValue: '1',
  provide: 'version',
};

@Module({
  providers: [LoggerHelper, versionProvider],
  exports: [LoggerHelper],
})
export class LogModule {}
