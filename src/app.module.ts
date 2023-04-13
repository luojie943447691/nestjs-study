import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './middle/LoggerMiddleware';

const versionProvider = {
  useValue: '1',
  provide: 'version',
};
@Module({
  imports: [UserModule, CatsModule],
  controllers: [AppController],
  providers: [AppService, versionProvider],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(
      {
        path: 'cats',
        method: RequestMethod.ALL,
      },
      {
        path: 'user',
        method: RequestMethod.ALL,
        version: '1',
      },
    );
  }
}
