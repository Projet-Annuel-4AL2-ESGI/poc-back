import { Test, TestingModule } from '@nestjs/testing';
import { TimeController } from './time.controller';
import { TimeService } from './time.service';
import { getRepositoryToken } from "@nestjs/typeorm";
import { Time } from "./entities/time.entity";

describe('TimeController', () => {
  let controller: TimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeController],
      providers: [
        TimeService,
        {
          provide: getRepositoryToken(Time),
          useValue: Time,
        },
      ],
    }).compile();

    controller = module.get<TimeController>(TimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
