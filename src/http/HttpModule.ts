import { Module } from '@nestjs/common';
import axios from 'axios';
import { HttpService } from './HttpService';

const httpOptionsProvider = {
  provide: 'HTTP_OPTIONS',
  useFactory: () => axios.create(),
};

@Module({
  imports: [],
  providers: [HttpService, httpOptionsProvider],
  exports: [HttpService],
})
export class HttpModule {}
