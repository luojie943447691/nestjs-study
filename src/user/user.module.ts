import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LogsModule } from '../logs/logs.module';
import { RolesModule } from 'src/roles/roles.module';
import { PermissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LogsModule, RolesModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
