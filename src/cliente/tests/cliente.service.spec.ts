import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../models/cliente.model';
import { ClienteRepository } from '../cliente.repository';

describe('ClienteService', () => {
  let service: ClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClienteService, ClienteRepository],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('deve criar um cliente', () => {
    const clienteRepository = new ClienteRepository();
    const clienteService = new ClienteService(clienteRepository);
    const id =
      clienteRepository.lerClientes()[
        clienteRepository.lerClientes().length - 1
      ].id + 1;
    const esperado = new Cliente('Mayara', id, 'Rua B, N3', '99989998');
    const resposta = clienteService.criarCliente(
      'Mayara',
      'Rua B, N3',
      '99989998',
    );

    expect(esperado).toBeInstanceOf(Cliente);
    expect(resposta.nome).toBe('Mayara');
    expect(resposta.id).toBe(id);
    expect(resposta.endereco).toBe('Rua B, N3');
    expect(resposta.telefone).toBe('99989998');
  });

  test('deve remover cliente e retornar "undefined" ao procurá-lo no json', () => {
    const clienteRepository = new ClienteRepository();
    const clienteService = new ClienteService(clienteRepository);
    const id = clienteRepository.lerClientes().length - 1;

    clienteService.removerCliente(id);
  });

  test('deve retornar erro ao passar um id não existente', () => {
    const clienteRepository = new ClienteRepository();
    const clienteService = new ClienteService(clienteRepository);

    expect(() => {
      clienteService.removerCliente(123);
    }).toThrow();
  });
});
