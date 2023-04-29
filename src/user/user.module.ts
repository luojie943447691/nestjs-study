import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LogsModule } from '../logs/logs.module';
import { RolesModule } from 'src/roles/roles.module';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { BullModule } from '@nestjs/bull';
import { UserConsumer } from './queue/user.consumer';
import { UserProducer } from './queue/user.producer';
import { SecondUserConsumer } from './queue/second-user.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    LogsModule,
    RolesModule,
    BullModule.registerQueue({
      name: 'user',
    }),
    BullModule.registerQueue({
      configKey: 'second-redis',
      name: 'second-user',
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserConsumer, UserProducer, SecondUserConsumer],
  exports: [UserService],
})
export class UserModule {}
