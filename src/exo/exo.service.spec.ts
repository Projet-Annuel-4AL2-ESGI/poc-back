import { Test, TestingModule } from '@nestjs/testing';
import { ExoService } from './exo.service';

describe('ExoService', () => {
  let service: ExoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExoService],
    }).compile();

    service = module.get<ExoService>(ExoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
