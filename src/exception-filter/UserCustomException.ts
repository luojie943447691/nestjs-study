import { HttpException, HttpStatus } from '@nestjs/common';

export class UserCustomExcetion extends HttpException {
  constructor() {
    super('UserInfo Not Found', HttpStatus.FORBIDDEN);
  }
}
