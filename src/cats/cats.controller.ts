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
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/exception-filter/HttpExceptionFilter';
import { UserCustomExcetion } from 'src/exception-filter/UserCustomException';
import { HttpService } from 'src/http/HttpService';
import { UserService } from 'src/user/user.service';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { CatByIdPipe } from './pipes/CatByIdPipe';

@Controller('cats')
export class CatsController {
  @Inject(HttpExceptionFilter)
  appFilter: HttpExceptionFilter;

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
}
