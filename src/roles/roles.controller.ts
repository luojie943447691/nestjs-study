import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRolePipe } from './pipes/create-role.pipe';
import { Role } from './entities/role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body(CreateRolePipe) createRoleDto: CreateRoleDto) {
    const res = await this.rolesService.create(createRoleDto as Role);
    return res;
  }

  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(CreateRolePipe) updateRoleDto: UpdateRoleDto,
  ) {
    const res = await this.rolesService.update(id, updateRoleDto as Role);
    return res;
  }
}
