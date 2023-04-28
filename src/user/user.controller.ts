import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Inject,
  LoggerService,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { User } from './entities/user.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CreateUserPipe } from './pipes/create-user.pipe';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AdminGuard } from 'src/guards/AdminGuard';
import { UpdateUserGuard } from './guards/update-user.guards';
import { JWTGuard } from 'src/guards/jwt.guard';
import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  CACHE_MANAGER,
} from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

// @UseGuards(JWTGuard)
@Controller({
  path: 'user',
})
@UseInterceptors(CacheInterceptor)
export class UserController {
  // private logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  create(@Body(CreateUserPipe) user: CreateUserDto) {
    return this.userService.create(user as User);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Patch('/:id')
  @UseGuards(UpdateUserGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
    return this.userService.update(id, user as User);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Get('findProfile/:id')
  @UseGuards(AdminGuard)
  findProfile(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.userService.findProfile(id);
  }

  @Get('logs/:id')
  @CacheKey('custom_key')
  @CacheTTL(5 * 1000)
  findLogs(@Param('id', ParseIntPipe) id: number) {
    this.logger.warn('这是测试信息');
    // throw new HttpException('这是测试测试日志', HttpStatus.NOT_FOUND);
    return this.userService.findLogs(id);
  }
}
