import { DynamicModule } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import * as path from 'path';

export function handlePinoModule(): DynamicModule {
  return LoggerModule.forRoot({
    pinoHttp: {
      transport: {
        targets: [
          process.env.NODE_ENV === 'development'
            ? {
                level: 'info',
                target: 'pino-pretty', // 在开发的时候打印信息
                options: {
                  colorize: true,
                },
              }
            : {
                level: 'info',
                target: 'pino-roll', // 设置滚动日志
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
  });
}
