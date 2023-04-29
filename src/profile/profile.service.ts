import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly userService: UserService,
  ) {}
  async create(avatar: Express.Multer.File, profile: Partial<Profile>) {
    const user = await this.userService.findById(
      profile.user as unknown as number,
    );
    if (!user) {
      throw new BadRequestException('用户不存在！');
    }
    // 查询 user
    profile.user = user;

    profile.avatar = avatar.buffer;
    const _profile = this.profileRepository.create(profile);
    return this.profileRepository.save(_profile);
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
