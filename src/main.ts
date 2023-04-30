import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception-filter/HttpExceptionFilter';
import { LoggingInterceptor } from './interceptors/LoggingInterceptor';
import { patchWinston } from './winston/patchWinston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 启用接口 api 版本
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useWebSocketAdapter(new WsAdapter(app));
  // 日志文件
  // patchWinston(app);
  // 全局异常过滤器 已经被移动到 app.module.ts 中
  // app.useGlobalFilters(new HttpExceptionFilter());
  // 全局校验管道
  app.useGlobalPipes(
    new ValidationPipe({
      // 打开此属性，如果用户恶意传 dto 中没有装饰器的字段， pipes 会自动给他过滤掉
      whitelist: true,
      transform: true,
    }),
  );
  // 全局拦截器
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3100, '0.0.0.0');
}
bootstrap();
