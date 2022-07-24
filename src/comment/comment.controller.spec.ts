import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { getRepositoryToken } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { User } from "../user/entities/user.entity";

describe('CommentController', () => {
  let controller: CommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        CommentService,
        {
          provide: getRepositoryToken(Comment),
          useValue: Comment,
        },
        {
          provide: getRepositoryToken(User),
          useValue: User,
        },
      ],
    }).compile();

    controller = module.get<CommentController>(CommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
