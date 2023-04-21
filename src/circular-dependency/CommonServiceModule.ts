import { Module } from '@nestjs/common';
import { CatsService } from '../cats/cats.service';
import { CommonService } from './CommonService';

@Module({
  providers: [CommonService, CatsService],
  exports: [CommonService],
})
export class CommonServiceModule {}
