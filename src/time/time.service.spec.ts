import { Test, TestingModule } from '@nestjs/testing';
import { TimeService } from './time.service';
import { getRepositoryToken } from "@nestjs/typeorm";
import { Time } from "./entities/time.entity";

describe('TimeService', () => {
  let service: TimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimeService,
        {
          provide: getRepositoryToken(Time),
          useValue: Time,
        },
      ],
    }).compile();

    service = module.get<TimeService>(TimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
