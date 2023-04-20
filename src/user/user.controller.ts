import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Redirect,
  Query,
  ParseIntPipe,
  Logger,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { User } from './entities/user.entity';

@Controller({
  path: 'user',
})
export class UserController {
  // private logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @Post()
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() user: User) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Get('findProfile/:id')
  findProfile(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findProfile(id);
  }

  @Get('logs/:id')
  findLogs(@Param('id', ParseIntPipe) id: number) {
    this.logger.log('请求logs成功');
    this.logger.warn('请求logs成功');
    this.logger.debug('请求logs成功');
    this.logger.error('请求logs成功');
    this.logger.verbose('请求logs成功');
    return this.userService.findLogs(id);
  }
}
