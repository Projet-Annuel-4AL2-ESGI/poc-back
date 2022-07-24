import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { GetCommentDto } from './dto/get-comment.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    await this.commentRepository.save(createCommentDto);
    const user = await this.userRepository.findOne(createCommentDto.userId);
    const commentTemp: GetCommentDto = {
      postId: createCommentDto.postId,
      userId: createCommentDto.userId,
      userName: user.username,
      commentMessage: createCommentDto.commentMessage,
      userImage: user.image,
    };
    return commentTemp;
  }

  findAll() {
    return this.commentRepository.find();
  }

  async findAllByPostId(id: number) {
    const comments = await this.commentRepository.find({
      where: { postId: id },
    });
    const commentsGet: GetCommentDto[] = [];
    for (const comment of comments) {
      const user = await this.userRepository.findOne(comment.userId);
      const commentTemp: GetCommentDto = {
        postId: comment.postId,
        userId: comment.userId,
        userName: user.username,
        commentMessage: comment.commentMessage,
        userImage: user.image,
      };
      commentsGet.push(commentTemp);
    }

    return commentsGet;
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
