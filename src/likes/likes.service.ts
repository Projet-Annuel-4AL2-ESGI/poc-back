import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Like } from "./entities/like.entity";
import { Repository } from "typeorm";

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
  ) {}
  create(createLikeDto: CreateLikeDto) {
    return this.likeRepository.save(createLikeDto);
  }

  findAll() {
    return this.likeRepository.find();
  }

  findOne(id: number) {
    return this.likeRepository.findOne(id);
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return this.likeRepository.save({
      id: id,
      userId: updateLikeDto.userId,
      postId: updateLikeDto.postId,
    });
  }

  remove(createLikeDto: CreateLikeDto) {
    return this.likeRepository.delete({
      userId: createLikeDto.userId,
      postId: createLikeDto.postId,
    });
  }
}
