import { Module } from '@nestjs/common';
import axios from 'axios';
import { LoggerHelper } from 'src/log/LogHelper';
import { HttpService } from './HttpService';

@Module({
  controllers: [HttpService],
  providers: [LoggerHelper],
})
export class HttpModule {}
