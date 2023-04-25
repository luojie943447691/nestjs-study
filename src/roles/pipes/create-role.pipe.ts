import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class CreateRolePipe implements PipeTransform {
  transform(value: CreateRoleDto, metadata: ArgumentMetadata) {
    if (value.permissions instanceof Array && value.permissions.length > 0) {
      if (value.permissions[0]['id']) {
        value.permissions = value.permissions.map(
          (permission) => permission.id,
        );
      }
    }
    return value;
  }
}
