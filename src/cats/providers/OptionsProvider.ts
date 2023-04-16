import { Injectable } from '@nestjs/common';

@Injectable()
export class OptionsProvider {
  get() {
    return 'this is from OptionsProvider';
  }
}
