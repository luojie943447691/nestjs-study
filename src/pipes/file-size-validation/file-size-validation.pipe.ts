import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: File, metadata: ArgumentMetadata) {
    const oneM = 1024 * 1024;

    if (value.size > oneM) {
      throw new BadRequestException('文件不能大于 1M');
    }

    return value;
  }
}
