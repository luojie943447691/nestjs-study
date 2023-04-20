import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log) private readonly logRepository: Repository<Log>,
  ) {}
  create(createLogDto: CreateLogDto) {
    return 'This action adds a new log';
  }

  findAll() {
    return `This action returns all logs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} log`;
  }

  update(id: number, updateLogDto: UpdateLogDto) {
    return `This action updates a #${id} log`;
  }

  remove(id: number) {
    return `This action removes a #${id} log`;
  }

  findLogs(user: User) {
    return this.logRepository.find({
      where: {
        user,
      },
      relations: {
        user: true,
      },
    });
  }

  async findLogsByGroup(id: number) {
    return this.logRepository
      .createQueryBuilder('log')
      .select('count("log.result")')
      .addSelect('log.result')
      .leftJoinAndSelect('log.user', 'user')
      .where('user.id = :id', { id })
      .groupBy('log.result')
      .getRawMany();
  }
}
