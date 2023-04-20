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
import { APP_GUARD } from '@nestjs/core';
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
import { LoggerModule } from 'nestjs-pino';

const envFilePath = path.join(
  __dirname,
  '..',
  `.env.${process.env.NODE_ENV ?? 'development'}`,
);

@Module({
  imports: [
    UserModule,
    CatsModule,
    GlobalModule,
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
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(false),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get(DatabaseEnum.DB_TYPE),
          host: configService.get(DatabaseEnum.DB_HOST),
          port: configService.get(DatabaseEnum.DB_PORT),
          username: configService.get(DatabaseEnum.DB_USERNAME),
          password: configService.get(DatabaseEnum.DB_PASSWORD),
          database: configService.get(DatabaseEnum.DB_DATABASE),
          // 同步本地的 schema -> 数据库 ，一般是初始化使用
          synchronize: configService.get(DatabaseEnum.DB_SYNC),
          logging: false,
          // logging: ['error', 'warn'],
          entities: [User, Profile, Log, Role],
        } as TypeOrmModuleOptions),
    }),
    ProfileModule,
    LogsModule,
    RolesModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          targets: [
            process.env.NODE_ENV === 'development'
              ? {
                  level: 'info',
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                  },
                }
              : {
                  level: 'info',
                  target: 'pino-roll',
                  options: {
                    file: path.join('logs', 'log'),
                    frequency: 'daily',
                    mkdir: true,
                  },
                },
          ],
        },

        // {
        //   // targets: [
        //   //   {
        //   //     level: 'info',
        //   //     target: 'pino-pretty',
        //   //     options: {
        //   //       colorize: true,
        //   //     },
        //   //   },
        //   //   {
        //   //     level: 'info',
        //   //     target: 'pino-roll',
        //   //     options: {
        //   //       file: path.join('logs', 'log.txt'),
        //   //       frequency: 'daily',
        //   //       mkdir: true,
        //   //     },
        //   //   },
        //   // ],
        // },
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
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
