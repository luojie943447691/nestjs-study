import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { HttpService } from 'src/http/HttpService';
import { LoggerHelper } from 'src/log/LogHelper';
import axios from 'axios';
import { HttpModule } from 'src/http/HttpModule';

const httpOptionsProvider = {
  provide: 'HTTP_OPTIONS',
  useFactory: () => axios.create(),
};

const versionProvider = {
  useValue: '1',
  provide: 'version',
};

@Module({
  imports: [UserModule, HttpModule],
  controllers: [CatsController],
  providers: [
    LoggerHelper,
    CatsService,
    UserService,
    HttpService,
    httpOptionsProvider,
    // versionProvider,
  ],
})
export class CatsModule {}
