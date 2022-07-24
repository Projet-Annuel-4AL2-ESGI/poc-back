import { Test, TestingModule } from '@nestjs/testing';
import { ExoController } from './exo.controller';
import { ExoService } from './exo.service';
import { getRepositoryToken } from "@nestjs/typeorm";
import { Exo } from "./entities/exo.entity";
import { CodeService } from "../code/code.service";
import { Code } from "../code/entities/code.entity";
import { TimeService } from "../time/time.service";
import { Time } from "../time/entities/time.entity";

describe('ExoController', () => {
  let controller: ExoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExoController],
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

    controller = module.get<ExoController>(ExoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
