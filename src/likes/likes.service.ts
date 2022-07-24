import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { Post } from '../post/entities/post.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  async create(createLikeDto: CreateLikeDto) {
    const post = await this.postRepository.findOne(createLikeDto.postId);
    post.likes += 1;
    await this.postRepository.save(post);
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

  async remove(createLikeDto: CreateLikeDto) {
    const post = await this.postRepository.findOne(createLikeDto.postId);
    post.likes -= 1;
    if (post.likes < 0) {
      post.likes = 0;
    }
    await this.postRepository.save(post);
    return this.likeRepository.delete({
      userId: createLikeDto.userId,
      postId: createLikeDto.postId,
    });
  }
}
