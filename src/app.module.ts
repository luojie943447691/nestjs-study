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
import { GlobalModule } from './global.module';

@Module({
  imports: [UserModule, CatsModule, GlobalModule],
  controllers: [AppController],
  providers: [AppService],
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
