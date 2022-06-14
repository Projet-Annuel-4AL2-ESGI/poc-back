import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  create(createPostDto: CreatePostDto) {
    return this.postRepository.save(createPostDto);
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return this.postRepository.findOne(id);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.save({
      id: id,
      type: updatePostDto.type,
      title: updatePostDto.title,
      description: updatePostDto.description,
      likes: updatePostDto.likes,
      image: updatePostDto.image,
    });
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
