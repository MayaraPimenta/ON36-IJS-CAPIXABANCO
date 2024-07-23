import { Test, TestingModule } from '@nestjs/testing';
import { GerenteService } from './gerente.service';

describe('GerenteService', () => {
  let service: GerenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GerenteService],
    }).compile();

    service = module.get<GerenteService>(GerenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
