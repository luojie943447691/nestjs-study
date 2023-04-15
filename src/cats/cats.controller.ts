import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserCustomExcetion } from 'src/exception-filter/UserCustomException';
import { HttpService } from 'src/http/HttpService';
import { UserService } from 'src/user/user.service';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly useService: UserService,
    private readonly httpService: HttpService,
  ) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('id', id);

    return this.catsService.findOne(+id) + this.useService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
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
}
