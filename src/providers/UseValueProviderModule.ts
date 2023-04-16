import { Module } from '@nestjs/common';
import { CatsModule } from 'src/cats/cats.module';
import { CatsService } from 'src/cats/cats.service';

const mockCatsService = {
  /* mock implementation
  ...
  */
  findOne(id: number) {
    return `this is from custom provider #${id}`;
  },
};

@Module({
  imports: [CatsModule],
  providers: [
    {
      provide: CatsService,
      useValue: mockCatsService,
    },
  ],
})
export class UseValueProviderModule {}
