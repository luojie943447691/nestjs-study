import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(permission: Partial<Permission>) {
    const existed = await this.findByCode(permission.code);
    if (existed && existed.id) {
      throw new BadRequestException('权限已存在！');
    }

    const _permission = this.permissionRepository.create(permission);

    return await this.permissionRepository.save(_permission);
  }

  async findByCode(code: string) {
    return await this.permissionRepository.findOne({ where: { code } });
  }

  async findByIds(permissions: number[]);
  async findByIds(permissions: Permission[]);
  async findByIds(permissions: (number | Permission)[]) {
    const res = await this.permissionRepository.find({
      where: {
        id: In(permissions),
      },
    });
    return res;
  }
}
