import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { PermissionsService } from 'src/permissions/permissions.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly permissionsService: PermissionsService,
  ) {}
  async create(role: Partial<Role>) {
    // 是否重复
    const existed = await this.findByName(role.name);
    if (existed && existed.id) {
      throw new BadRequestException('角色已存在！');
    }
    if (role.permissions) {
      role.permissions = await this.permissionsService.findByIds(
        role.permissions as unknown as number[],
      );
    }

    const _role = this.roleRepository.create(role);
    return await this.roleRepository.save(_role);
  }

  async update(id: number, role: Partial<Role>) {
    // 通过id查询是否存在
    const existed = await this.findById(id);
    if (!existed) {
      throw new BadRequestException('角色不存在！');
    }

    const res = this.roleRepository.merge(existed, role);

    return await this.roleRepository.save(res);
  }

  findAll() {
    return `This action returns all roles`;
  }

  async findByName(name: string) {
    const res = await this.roleRepository.findOne({ where: { name } });
    return res;
  }

  async findById(id: number) {
    return await this.roleRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByIds(roles: Role[]);
  async findByIds(roles: number[]);
  async findByIds(roles: (Role | number)[]) {
    return await this.roleRepository.find({
      where: {
        id: In(roles),
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
