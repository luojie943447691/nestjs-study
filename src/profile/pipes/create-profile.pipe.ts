import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateProfileDto } from '../dto/create-profile.dto';

@Injectable()
export class CreateProfilePipe implements PipeTransform {
  transform(value: CreateProfileDto, metadata: ArgumentMetadata) {
    if (value.user && typeof value.user !== 'number') {
      value.user = value.user.id;
    }
    value.gender = +(value.gender ?? 1);
    return value;
  }
}
