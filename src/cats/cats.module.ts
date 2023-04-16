import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { UserModule } from 'src/user/user.module';
import { HttpModule } from 'src/http/HttpModule';
import { CONNECTION } from './constant';

const mockCatsService = {
  /* mock implementation
  ...
  */
  findAll() {
    return `this is from custom provider's findAll`;
  },
};

const connection = 'this is connection';

@Module({
  imports: [UserModule, HttpModule],
  controllers: [CatsController],
  providers: [
    // CatsService,
    {
      provide: CatsService,
      useValue: mockCatsService,
    },
    {
      provide: CONNECTION,
      useValue: connection,
    },
  ],
})
export class CatsModule {}
