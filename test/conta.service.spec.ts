import { Test, TestingModule } from '@nestjs/testing';
import { ContaService } from '../src/application/conta.service';
import { ContaRepository } from '../src/infrastructure/persistence/conta.repository';
import { ClienteRepository } from '../src/infrastructure/persistence/cliente.repository';
import { ContaFactory } from '../src/domain/conta/ContaFactory';
import { TipoConta } from '../src/domain/conta/TipoConta';
import { Conta } from '../src/domain/conta/conta.model';
import { NotFoundException } from '@nestjs/common';

describe('ContaService', () => {
  let service: ContaService;
  let contaService: ContaService;
  let contaRepository: ContaRepository;
  let clienteRepository: ClienteRepository;
  let contaFactory: ContaFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContaService,
        {
          provide: ContaRepository,
          useValue: {
            lerContas: jest.fn(),
            escreverContas: jest.fn(),
          },
        },
        {
          provide: ClienteRepository,
          useValue: {
            lerClientes: jest.fn(),
          },
        },
        {
          provide: ContaFactory,
          useValue: {
            criarConta: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ContaService>(ContaService);
    contaService = module.get<ContaService>(ContaService);
    contaRepository = module.get<ContaRepository>(ContaRepository);
    clienteRepository = module.get<ClienteRepository>(ClienteRepository);
    contaFactory = module.get<ContaFactory>(ContaFactory);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const saldo = 100;
  let clienteId = 1;
  const tipoConta = TipoConta.CORRENTE;
  const novaConta = new Conta(1, saldo, clienteId, tipoConta);
  const contas: Conta[] = [];
  const clientes = [{ id: clienteId, nome: 'Cliente 1' }];

  test('Deve criar uma nova conta', () => {
    (contaRepository.lerContas as jest.Mock).mockReturnValue(contas);
    (clienteRepository.lerClientes as jest.Mock).mockReturnValue(clientes);
    (contaFactory.criarConta as jest.Mock).mockReturnValue(novaConta);

    const resultado = contaService.criarConta(saldo, clienteId, tipoConta);

    expect(resultado).toEqual(novaConta);
    expect(contaRepository.lerContas).toHaveBeenCalled();
    expect(clienteRepository.lerClientes).toHaveBeenCalled();
    expect(contaFactory.criarConta).toHaveBeenCalledWith(
      1,
      saldo,
      clienteId,
      tipoConta,
    );
    expect(contaRepository.escreverContas).toHaveBeenCalledWith([novaConta]);
  });

  test('Deve retornar NotFoundException ao enviar um clientId inexistente', () => {
    (contaRepository.lerContas as jest.Mock).mockReturnValue(contas);
    (clienteRepository.lerClientes as jest.Mock).mockReturnValue(clientes);
    (contaFactory.criarConta as jest.Mock).mockReturnValue(novaConta);

    clienteId = 12345;

    expect(() => contaService.criarConta(saldo, clienteId, tipoConta)).toThrow(
      NotFoundException,
    );
  });

  test('Deve alterar o tipo da conta', () => {
    (contaRepository.lerContas as jest.Mock).mockReturnValue(contas);
    (clienteRepository.lerClientes as jest.Mock).mockReturnValue(clientes);
    (contaFactory.criarConta as jest.Mock).mockReturnValue(novaConta);

    clienteId = 1;
    contaService.criarConta(saldo, clienteId, tipoConta);
    const resultado = contaService.modificarTipoConta(1, TipoConta.POUPANCA);
    const esperado = new Conta(1, saldo, clienteId, TipoConta.POUPANCA);

    expect(resultado).toStrictEqual(esperado);
    expect(contaRepository.lerContas).toHaveBeenCalled();
    expect(contaRepository.escreverContas).toHaveBeenCalled();
  });

  test('Deve retornar NotFoundException se conta não for encontrada', () => {
    (contaRepository.lerContas as jest.Mock).mockReturnValue(contas);
    (clienteRepository.lerClientes as jest.Mock).mockReturnValue(clientes);
    (contaFactory.criarConta as jest.Mock).mockReturnValue(novaConta);

    expect(() =>
      contaService.modificarTipoConta(12345, TipoConta.POUPANCA),
    ).toThrow(NotFoundException);
  });

  test('Deve remover a conta solicitada', () => {
    (contaRepository.lerContas as jest.Mock).mockReturnValue(contas);
    (clienteRepository.lerClientes as jest.Mock).mockReturnValue(clientes);
    (contaFactory.criarConta as jest.Mock).mockReturnValue(novaConta);

    clienteId = 1;
    contaService.criarConta(saldo, clienteId, tipoConta);
    const resultado = contaService.removerConta(1);

    // eslint-disable-next-line prettier/prettier
    expect(resultado).toStrictEqual({ 'message': 'Conta deletada com sucesso!' });
    expect(contas).toHaveLength(0);
    expect(contaRepository.lerContas).toHaveBeenCalled();
    expect(contaRepository.escreverContas).toHaveBeenCalled();
  });

  test('Deve retornar NotFoundException se conta não for encontrada', () => {
    (contaRepository.lerContas as jest.Mock).mockReturnValue(contas);
    (clienteRepository.lerClientes as jest.Mock).mockReturnValue(clientes);
    (contaFactory.criarConta as jest.Mock).mockReturnValue(novaConta);

    expect(() => contaService.removerConta(12345)).toThrow(NotFoundException);
  });
});
