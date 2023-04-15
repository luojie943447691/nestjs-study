import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception-filter/HttpExceptionFilter';
import { UserCustomExcetionFilter } from './exception-filter/UserCustomExcetionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 启用接口 api 版本
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // 全局异常过滤器
  // app.useGlobalFilters(new HttpExceptionFilter());
  // 全局自定义异常过滤器
  app.useGlobalFilters(new UserCustomExcetionFilter());
  await app.listen(3000);
}
bootstrap();
