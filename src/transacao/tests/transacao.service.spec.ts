import { Test, TestingModule } from '@nestjs/testing';
import { TransacaoService } from '../transacao.service';

describe('TransacaoService', () => {
  let service: TransacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransacaoService],
    }).compile();

    service = module.get<TransacaoService>(TransacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
