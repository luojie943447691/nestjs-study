import { Module } from '@nestjs/common';
import { CatsService, ProductionCatsService, Test } from './cats.service';
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
const mockCatsServiceProvider = {
  provide: CatsService,
  useValue: mockCatsService,
};

const connection = 'this is connection';
const connectionProvider = {
  provide: CONNECTION,
  useValue: connection,
};

process.env.NODE_ENV = 'development';

// useClass
const configServiceProvider = {
  // provide: Test,
  provide: CatsService,
  useClass:
    process.env.NODE_ENV === 'development'
      ? CatsService
      : ProductionCatsService,
};

@Module({
  imports: [UserModule, HttpModule],
  controllers: [CatsController],
  providers: [
    // CatsService,
    // mockCatsServiceProvider,
    connectionProvider,
    configServiceProvider,
  ],
})
export class CatsModule {}
