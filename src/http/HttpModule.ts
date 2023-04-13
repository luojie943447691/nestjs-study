import { Module } from '@nestjs/common';
import axios from 'axios';
import { LogModule } from 'src/log/LogModule';
import { HttpService } from './HttpService';

const httpOptionsProvider = {
  provide: 'HTTP_OPTIONS',
  useFactory: () => axios.create(),
};

@Module({
  imports: [LogModule],
  providers: [HttpService, httpOptionsProvider],
  exports: [HttpService],
})
export class HttpModule {}
