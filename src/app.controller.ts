import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { DatabaseEnum } from './enum/databaseEnum';
// import { ConfigService } from './dynamic-modules/config/config.service';
import * as config from 'config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private readonly configService: ConfigService,
    private readonly configService: ConfigService,
  ) {
    console.log('DB', this.configService.get(DatabaseEnum.DB_TYPE));
    console.log('DB_HOST', this.configService.get(DatabaseEnum.DB_HOST));
    console.log(
      'DB_USER_NAME',
      this.configService.get(DatabaseEnum.DB_USERNAME),
    );
    console.log(
      'DB_PASSWORD',
      this.configService.get(DatabaseEnum.DB_PASSWORD),
    );

    console.log('config', config.get('DB.USER_NAME'));
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':key')
  getEnv(@Param('key') key: string) {
    return this.configService.get(key);
  }
}
