import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}
  create(createCommentDto: CreateCommentDto) {
    return this.commentRepository.save(createCommentDto);
  }

  findAll() {
    return this.commentRepository.find();
  }

  findOne(id: number) {
    return this.commentRepository.findOne(id);
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return this.commentRepository.delete(id);
  }
}
