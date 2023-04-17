import {
  forwardRef,
  Get,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CommonService } from 'src/circular-dependency/CommonService';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService implements OnModuleInit {
  private service: CommonService;
  private readonly cats: Cat[] = [
    {
      name: 'Robert Harris',
      age: 8166920378099556,
      breed: null,
      id: 1,
    },
    null,
  ];

  constructor(
    @Inject(forwardRef(() => CommonService))
    private readonly commonService: CommonService,
    private moduleRef: ModuleRef,
  ) {}
  onModuleInit() {
    // 全局查找
    this.service = this.moduleRef.get(CommonService, { strict: false });
  }

  // private readonly cats: Cat[] = null;

  create(createCatDto: CreateCatDto) {
    this.cats.push(createCatDto);
  }

  findAll() {
    return this.cats;
  }

  findOne(id: number) {
    return this.cats.find((d) => d?.id === id);
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}

@Injectable()
export class ProductionCatsService {
  @Get()
  findAll() {
    return 'this is from production findAll';
  }
}

@Injectable()
export class Test {
  private readonly cats: Cat[] = [];

  // private readonly cats: Cat[] = null;

  create(createCatDto: CreateCatDto) {
    this.cats.push(createCatDto);
  }

  findAll() {
    return this.cats;
  }

  findOne(id: number) {
    return 'Test';
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return 'Test';
  }

  remove(id: number) {
    return 'Test';
  }
}
