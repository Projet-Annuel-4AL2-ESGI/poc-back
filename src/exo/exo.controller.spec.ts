import { Test, TestingModule } from '@nestjs/testing';
import { ExoController } from './exo.controller';
import { ExoService } from './exo.service';

describe('ExoController', () => {
  let controller: ExoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExoController],
      providers: [ExoService],
    }).compile();

    controller = module.get<ExoController>(ExoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
