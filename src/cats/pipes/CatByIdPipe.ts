import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { CatsService } from '../cats.service';
import { Cat } from '../entities/cat.entity';

export class CatByIdPipe implements PipeTransform<number, Cat> {
  service: CatsService;
  constructor() {
    if (!this.service) {
      this.service = new CatsService();
    }
  }
  transform(value: number, metadata: ArgumentMetadata) {
    const res = this.service.findOne(value);

    return res;
  }
}
