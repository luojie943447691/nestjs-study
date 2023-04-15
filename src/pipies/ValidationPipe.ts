import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype, type, data }: ArgumentMetadata) {
    console.log('ValidationPipe');

    console.log('metatype', metatype);
    // console.log('type', type);
    // console.log('data', data);

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    console.log('value', value);
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    console.log('errors', errors);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Type): boolean {
    const types: Type[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
