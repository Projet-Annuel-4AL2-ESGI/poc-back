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
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createReadStream } from 'fs';
import { join } from 'path';
import { UpdateImageDto } from "./dto/update-image.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('upload/:id')
  uploadFile(@Param('id') id: number, @Body() updateImageDto: UpdateImageDto) {
    return this.userService.addImage(id, updateImageDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('follow/:id')
  findFollow(@Param('id') id: number) {
    return this.userService.findFollows(id);
  }

  @Get('following/list/:id')
  findFollowingList(@Param('id') id: number) {
    return this.userService.findFollowingsList(id);
  }

  @Get('follow/list/:id')
  findFollowList(@Param('id') id: number) {
    return this.userService.findFollowersList(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Get('/profile/:id')
  findOneProfile(@Param('id') id: number) {
    return this.userService.findOneProfile(+id);
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
