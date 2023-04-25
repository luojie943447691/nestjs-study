import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LogsService } from '../logs/logs.service';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly logsService: LogsService,
    private readonly rolesService: RolesService,
  ) {}
  async create(user: Partial<User>) {
    // 校验是否存在相同用户名的数据
    const existed = await this.findByUsername(user.username);
    if (existed && existed.id) {
      throw new BadRequestException('您输入的账号已存在!');
    }

    // 如果不传递roles数据，就是普通用户
    if (!user.roles) {
      user.roles = await this.rolesService.findByIds([2]);
    }
    // 如果是直接传递 role.id ，则查询出来相应的 role 数据
    if (user.roles instanceof Array && typeof user.roles[0] === 'number') {
      // 查询所有的用户角色
      user.roles = await this.rolesService.findByIds(user.roles);
    }
    const userTemp = this.userRepository.create(user);

    return await this.userRepository.save(userTemp);
  }

  findAll() {
    return this.userRepository.find();
  }

  findById(id: number) {
    return this.userRepository.findOne({ where: { id }, relations: ['roles'] });
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['roles'],
    });

    return user;
  }

  async update(id: number, user: Partial<User>) {
    const existed = await this.findById(id);
    const _user = this.userRepository.merge(existed, user);
    return await this.userRepository.save(_user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  findProfile(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        profile: true,
      },
    });
  }

  async findLogs(id: number) {
    const user = await this.findById(id);
    return this.logsService.findLogs(user);
  }
}
