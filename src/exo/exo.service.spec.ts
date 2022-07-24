import { Test, TestingModule } from '@nestjs/testing';
import { ExoService } from './exo.service';
import { getRepositoryToken } from "@nestjs/typeorm";
import { Exo } from "./entities/exo.entity";
import { TimeService } from "../time/time.service";
import { CodeService } from "../code/code.service";
import { Code } from "../code/entities/code.entity";
import { Time } from "../time/entities/time.entity";

describe('ExoService', () => {
  let service: ExoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExoService,
        {
          provide: getRepositoryToken(Exo),
          useValue: Exo,
        },
        CodeService,
        {
          provide: getRepositoryToken(Code),
          useValue: Code,
        },
        TimeService,
        {
          provide: getRepositoryToken(Time),
          useValue: Time,
        },
      ],
    }).compile();

    service = module.get<ExoService>(ExoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
