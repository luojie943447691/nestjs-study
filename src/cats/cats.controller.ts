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
import { HttpExceptionFilter } from 'src/exception-filter/HttpExceptionFilter';
import { UserCustomExcetion } from 'src/exception-filter/UserCustomException';
import { Roles } from 'src/guards/Roles';
import { HttpService } from 'src/http/HttpService';
import { ErrorsInterceptor } from 'src/interceptors/ErrorsInterceptor';
import { ExcludeNullInterceptor } from 'src/interceptors/ExcludeNullInterceptor';
import { TransformInterceptor } from 'src/interceptors/TransformInterceptor';
import { UserService } from 'src/user/user.service';
import { CatsService } from './cats.service';
import { CONNECTION } from './constant';
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

  @Get('connection')
  testConnection(@Inject(CONNECTION) connection: string) {
    return `${connection}`;
  }
}
