import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../models/cliente.model';

describe('ClienteService', () => {
  let service: ClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClienteService],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('Criar cliente', () => {
  test('deve criar um cliente', () => {
    const clienteService = new ClienteService();
    const esperado = new Cliente('Mayara', 6, 'Rua B, N3', '99989998');
    const resposta = clienteService.criarCliente(
      'Mayara',
      'Rua B, N3',
      '99989998',
    );

    expect(esperado).toStrictEqual(resposta);
  });
});
