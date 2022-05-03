import { Test, TestingModule } from '@nestjs/testing';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Follow } from './entities/follow.entity';

describe('FollowController', () => {
  let controller: FollowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowController],
      providers: [
        FollowService,
        {
          provide: getRepositoryToken(Follow),
          useValue: Follow,
        },
      ],
    }).compile();

    controller = module.get<FollowController>(FollowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
