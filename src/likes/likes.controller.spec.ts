import { Test, TestingModule } from '@nestjs/testing';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Post } from "../post/entities/post.entity";

describe('LikesController', () => {
  let controller: LikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikesController],
      providers: [
        LikesService,
        {
          provide: getRepositoryToken(Like),
          useValue: Like,
        },
        {
          provide: getRepositoryToken(Post),
          useValue: Post,
        },
      ],
    }).compile();

    controller = module.get<LikesController>(LikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
