import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as path from 'path';
import { LogEnum } from 'src/enum/databaseEnum';

const {
  transports: { Console },
} = winston;

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

        const appDailyRotateFile: DailyRotateFile = new DailyRotateFile({
          level: 'warn',
          dirname: path.join('logs'),
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.simple(),
          ),
        });

        const infoDailyRotateFile: DailyRotateFile = new DailyRotateFile({
          level: configService.get(LogEnum.LOG_LEVEL),
          dirname: path.join('logs'),
          filename: 'info-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.simple(),
          ),
        });

        return {
          transports: [
            console,
            ...(configService.get(LogEnum.LOG_LEVEL)
              ? [appDailyRotateFile, infoDailyRotateFile]
              : []),
          ],
        };
      },
    }),
  ],
})
export class LogModule {}
