import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception-filter/HttpExceptionFilter';
import { LoggingInterceptor } from './interceptors/LoggingInterceptor';
import { patchWinston } from './winston/patchWinston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 启用接口 api 版本
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // 日志文件
  patchWinston(app);
  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局校验管道
  app.useGlobalPipes(new ValidationPipe());
  // 全局拦截器
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
