import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ClassSerializerInterceptor,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipeBuilder,
  HttpStatus,
  UploadedFiles,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from '../pipes/file-size-validation/file-size-validation.pipe';

@Controller('profile')
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      // limits: { fileSize: 5 * 1024 },
    }),
  )
  create(
    // 自定义 限制单文件不能大于 10kb
    // @UploadedFile(FileSizeValidationPipe) avatar: Express.Multer.File,
    // 限制文件不能大于1M，文件类型只能是图片， validators 也能自定义
    // @UploadedFile(
    //   new ParseFilePipe({
    //     validators: [
    //       new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
    //       new FileTypeValidator({ fileType: 'image/jpeg' }),
    //     ],
    //   }),
    // )
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 1024 * 1024 })
        .addFileTypeValidator({ fileType: 'image/jpeg' })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    avatar: Express.Multer.File,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.profileService.create(avatar, createProfileDto as Profile);
  }

  @Post('uploadBulk')
  @UseInterceptors(
    FilesInterceptor('avatar', 2, {
      limits: { fileSize: 1024 * 1024 },
    }),
  )
  bulkFile(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1024 * 10 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    avatars: Express.Multer.File[],
    @Body() createProfileDto: CreateProfileDto,
  ) {
    avatars.forEach((d) => {
      console.log('avatar.name', d.buffer.length);
    });

    return 'success';
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Patch('user/:userId')
  updateByUser(
    @Param('userId') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
