import { Inject, Injectable, Optional } from '@nestjs/common';

@Injectable()
export class LoggerHelper {
  @Optional()
  @Inject('version')
  version: string;

  log(info: string) {
    console.log(info, this.version);
  }
}
