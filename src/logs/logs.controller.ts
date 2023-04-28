import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize/serialize.interceptor';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  @UseInterceptors(new SerializeInterceptor(CreateLogDto))
  create(@Body() createLogDto: CreateLogDto) {
    console.log('createLogDto', createLogDto);

    return createLogDto;
  }

  @Get()
  findAll() {
    return this.logsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogDto: UpdateLogDto) {
    return this.logsService.update(+id, updateLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logsService.remove(+id);
  }

  @Get('logsByGroup/:userId')
  async getLogsByGroup(@Param('userId', ParseIntPipe) userId: number) {
    const res = await this.logsService.findLogsByGroup(userId);
    return res.map((d) => ({
      result: d.result,
      count: d.count,
    }));
  }
}
