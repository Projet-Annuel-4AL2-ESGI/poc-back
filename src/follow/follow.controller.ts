import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  create(@Body() createFollowDto: CreateFollowDto) {
    return this.followService.create(createFollowDto);
  }

  @Get()
  findAll() {
    return this.followService.findAll();
  }

  @Get('/following/:id')
  findAllFollowingById(@Param('id') id: number) {
    return this.followService.findAllFollowingById(id);
  }

  @Get('/followers/:id')
  findAllFollowersById(@Param('id') id: number) {
    return this.followService.findAllFollowersById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFollowDto: UpdateFollowDto) {
    return this.followService.update(+id, updateFollowDto);
  }

  @Delete()
  remove(@Body() createFollowDto: CreateFollowDto) {
    return this.followService.remove(createFollowDto);
  }
}
