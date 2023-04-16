import { Module } from '@nestjs/common';
import { OptionsProvider } from './OptionsProvider';

@Module({
  providers: [OptionsProvider],
  exports: [OptionsProvider],
})
export class OptionsProviderModule {}
