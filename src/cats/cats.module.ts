import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { UserModule } from 'src/user/user.module';
import { HttpModule } from 'src/http/HttpModule';

@Module({
  imports: [UserModule, HttpModule],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
