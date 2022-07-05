import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  StreamableFile,
  UploadedFile, UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as fs from 'fs';
import { JwtStrategy } from "../auth/strategy/jwt.strategy";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'userimages',
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    console.log(file);
    this.userService.addImage(id, file.filename);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Get('/mail/:email')
  findOneByMail(@Param('email') email: string) {
    return this.userService.findByMail(email);
  }

  @Get(':id/avatar')
  async getFileCustomizedResponse(
    @Res({ passthrough: true }) res,
    @Param('id') id: number,
  ): Promise<StreamableFile> {
    const user = await this.userService.findOne(id);
    const file = createReadStream(
      join(process.cwd(), `userimages/${user.image}`),
    );
    res.set({
      'Content-Type': 'image/*',
      //'Content-Disposition': `attachment; filename=${user.image}`,
    });
    //const base = fs.readFileSync(`userimages/${user.image}`);
    //console.log(base.toString('base64'));
    return new StreamableFile(file);
    //return base.toString('base64');
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
