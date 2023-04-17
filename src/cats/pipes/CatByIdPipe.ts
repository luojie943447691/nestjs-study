import { ArgumentMetadata, Inject, PipeTransform } from '@nestjs/common';
import { CatsService } from '../cats.service';
import { Cat } from '../entities/cat.entity';

export class CatByIdPipe implements PipeTransform<number, Cat> {
  constructor(@Inject(CatsService) private service: CatsService) {}
  transform(value: number, metadata: ArgumentMetadata) {
    const res = this.service.findOne(value);

    return res;
  }
}
