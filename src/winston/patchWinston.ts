import { createLogger } from 'winston';
import * as winston from 'winston';
import { utilities, WinstonModule } from 'nest-winston';
import { INestApplication } from '@nestjs/common';
import 'winston-daily-rotate-file';
import * as path from 'path';

export function patchWinston(app: INestApplication) {
  const instance = createLogger({
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(),
        ),
      }),
      new winston.transports.DailyRotateFile({
        level: 'warn',
        dirname: path.join('logs'),
        filename: 'application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        // format: winston.format.combine(
        //   winston.format.timestamp(),
        //   winston.format.simple(),
        // ),
      }),
      new winston.transports.DailyRotateFile({
        level: 'info',
        dirname: path.join('logs'),
        filename: 'info-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        // format: winston.format.combine(
        //   winston.format.timestamp(),
        //   winston.format.simple(),
        // ),
      }),
    ],
  });

  app.useLogger(WinstonModule.createLogger({ instance }));
}
