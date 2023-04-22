import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as path from 'path';
import { LogEnum } from '../enum/enum.config';

const {
  transports: { Console },
} = winston;

function createDailyRotateFile(level: string, name: string) {
  return new DailyRotateFile({
    level: level,
    dirname: path.join('logs'),
    filename: `${name}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  });
}

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const console = new Console({
          level: configService.get(LogEnum.LOG_LEVEL),
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(),
          ),
        });

        return {
          transports: [
            console,
            ...(configService.get(LogEnum.LOG_LEVEL) &&
            configService.get(LogEnum.LOG_ON)
              ? [
                  // 用函数的目的是防止出现即使不打开 LOG_ON ，也会生成 log 文件的问题
                  createDailyRotateFile('warn', 'application'),
                  createDailyRotateFile(
                    configService.get(LogEnum.LOG_LEVEL),
                    'info',
                  ),
                ]
              : []),
          ],
        };
      },
    }),
  ],
})
export class LogModule {}
