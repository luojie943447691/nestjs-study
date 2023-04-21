import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { HttpExceptionFilter } from '../exception-filter/HttpExceptionFilter';
import { UserCustomExcetion } from '../exception-filter/UserCustomException';
import { HttpService } from '../http/HttpService';
import { ErrorsInterceptor } from '../interceptors/ErrorsInterceptor';
import { ExcludeNullInterceptor } from '../interceptors/ExcludeNullInterceptor';
import { TransformInterceptor } from '../interceptors/TransformInterceptor';
import { UserService } from '../user/user.service';
import { CatsService, Test } from './cats.service';
import { CONNECTION, FACTORY_CON } from './constant';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { CatByIdPipe } from './pipes/CatByIdPipe';

@Controller('cats')
@UseInterceptors(
  TransformInterceptor,
  ExcludeNullInterceptor,
  ErrorsInterceptor,
)
export class CatsController {
  @Inject(HttpExceptionFilter)
  appFilter: HttpExceptionFilter;

  @Inject(CONNECTION)
  connection: string;
  @Inject(FACTORY_CON)
  factory: string;

  constructor(
    private readonly catsService: CatsService,
    // private readonly catsService: Test,
    private readonly useService: UserService,
    private readonly httpService: HttpService,
    @Inject(REQUEST) private req: Request,
  ) {
    // console.log('req', req);
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  // @Roles('admin')
  findOne(
    @Param('id', ParseIntPipe, CatByIdPipe)
    cat: Cat,
  ) {
    return cat;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.catsService.remove(+id);
  }

  @Get('test/dog')
  async findDog() {
    return await this.httpService.fetchData(
      'http://localhost:8889/server2/getStudentList',
    );
  }

  @Get('test/filter')
  testFilter() {
    // throw new HttpException(
    //   {
    //     message: '出错了！',
    //     status: HttpStatus.INTERNAL_SERVER_ERROR,
    //   },
    //   HttpStatus.INTERNAL_SERVER_ERROR,
    // );

    throw new UserCustomExcetion();
  }

  @Get('test/bindingFilter')
  testBindingFilter() {
    this.appFilter.logSomeMessage();
  }

  @Get('test/connection')
  testConnection() {
    return `${this.connection}`;
  }

  @Get('test/factory')
  testFactory() {
    return this.factory;
  }
}
