import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'userimages',
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  /*@Get()
  findAll() {
    return this.userService.findAll();
  }*/

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Get('/mail/:email')
  findOneByMail(@Param('email') email: string) {
    return this.userService.findByMail(email);
  }

  @Get('stream-file-customize/image')
  getFileCustomizedResponse(@Res({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), 'userimages/42d538560f31c9a6f147590e646b9def'),
    );
    res.set({
      'Content-Type': 'image/jpeg"',
      'Content-Disposition':
        'attachment; filename="42d538560f31c9a6f147590e646b9def',
    });
    return new StreamableFile(file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
