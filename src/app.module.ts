import {
  Logger,
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
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/RolesGuard';
// import { ConfigModule } from './dynamic-modules/config/config.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseEnum } from './enum/databaseEnum';
import * as Joi from 'joi';
import { User } from './user/entities/user.entity';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/entities/profile.entity';
import { LogsModule } from './logs/logs.module';
import { RolesModule } from './roles/roles.module';
import { Log } from './logs/entities/log.entity';
import { Role } from './roles/entities/role.entity';
import { handlePinoModule } from './pino';
import { HttpExceptionFilter } from './exception-filter/HttpExceptionFilter';
import { AllException } from './exception-filter/AllExceptionFilter';
import { LogModule } from './log/log.module';
import ormconfig from 'ormconfig';

const envFilePath = path.join(
  __dirname,
  '..',
  `.env.${process.env.NODE_ENV ?? 'development'}`,
);

@Module({
  imports: [
    // ConfigModule.register({ folder: 'env' }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: path.join(__dirname, '..', '.env') })],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        DB_TYPE: Joi.string().default('mysql'),
        DB_HOST: Joi.string().ip(),
        DB_PORT: Joi.number().default(3306),
        // DB_USERNAME: Joi.string().required(),
        // DB_PASSWORD: Joi.string().required(),
        // DB_DATABASE: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(false),
      }),
    }),
    TypeOrmModule.forRoot(ormconfig),
    // handlePinoModule(),
    ProfileModule,
    LogsModule,
    RolesModule,
    UserModule,
    CatsModule,
    GlobalModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      // useClass: HttpExceptionFilter,
      useClass: AllException,
    },
  ],
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
