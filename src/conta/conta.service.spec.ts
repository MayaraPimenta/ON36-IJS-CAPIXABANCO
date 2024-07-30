import { Test, TestingModule } from '@nestjs/testing';
import { ContaService } from './conta.service';

describe('ContaService', () => {
  let service: ContaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContaService],
    }).compile();

    service = module.get<ContaService>(ContaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
