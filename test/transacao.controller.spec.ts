import { Test, TestingModule } from '@nestjs/testing';
import { TransacaoController } from '../src/presenter/http/transacao.controller';

describe('TransacaoController', () => {
  let controller: TransacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransacaoController],
    }).compile();

    controller = module.get<TransacaoController>(TransacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
