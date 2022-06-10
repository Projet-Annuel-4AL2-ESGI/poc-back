import { Injectable } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from './entities/follow.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private followRepository: Repository<Follow>,
  ) {}
  create(createFollowDto: CreateFollowDto) {
    return this.followRepository.save(createFollowDto);
  }

  findAll() {
    return this.followRepository.find();
  }

  findOne(id: number) {
    return this.followRepository.findOne(id);
  }

  findAllFollowingById(id: number) {
    return this.followRepository.find({
      where: { follower: id },
    });
  }

  findAllFollowersById(id: number) {
    return this.followRepository.find({
      where: { following: id },
    });
  }

  update(id: number, updateFollowDto: UpdateFollowDto) {
    return this.followRepository.save({
      id: id,
      follower: updateFollowDto.follower,
      following: updateFollowDto.following,
    });
  }

  remove(createFollowDto: CreateFollowDto) {
    return this.followRepository.delete({
      follower: createFollowDto.follower,
      following: createFollowDto.following,
    });
  }
}
