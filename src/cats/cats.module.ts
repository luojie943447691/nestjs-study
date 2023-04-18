import { Module, Provider } from '@nestjs/common';
import { CatsService, ProductionCatsService, Test } from './cats.service';
import { CatsController } from './cats.controller';
import { UserModule } from 'src/user/user.module';
import { HttpModule } from 'src/http/HttpModule';
import { CONNECTION, FACTORY_CON } from './constant';
import { OptionsProvider } from './providers/OptionsProvider';
import { OptionsProviderModule } from './providers/OptionsProviderModule';
import { CommonServiceModule } from 'src/circular-dependency/CommonServiceModule';
import { CommonService } from 'src/circular-dependency/CommonService';

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

// useValue
const connection = 'this is connection';
const connectionProvider = {
  provide: CONNECTION,
  useValue: connection,
};

// process.env.NODE_ENV = 'development';

// useClass
const configServiceProvider = {
  // provide: Test,
  provide: CatsService,
  useClass:
    process.env.NODE_ENV === 'development'
      ? CatsService
      : ProductionCatsService,
};

// useFactory
const connectionFactory: Provider = {
  provide: FACTORY_CON,
  useFactory: (optionsProvider: OptionsProvider) => {
    return `${optionsProvider.get()} 123`;
  },
  inject: [OptionsProvider],
};

@Module({
  imports: [UserModule, HttpModule, OptionsProviderModule, CommonServiceModule],
  controllers: [CatsController],
  providers: [
    // CatsService,
    // mockCatsServiceProvider,
    connectionProvider,
    configServiceProvider,
    connectionFactory,
  ],
})
export class CatsModule {}
