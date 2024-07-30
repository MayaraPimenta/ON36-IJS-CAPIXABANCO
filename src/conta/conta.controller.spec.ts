import { Test, TestingModule } from '@nestjs/testing';
import { ContaController } from './conta.controller';

describe('ContaController', () => {
  let controller: ContaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContaController],
    }).compile();

    controller = module.get<ContaController>(ContaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
