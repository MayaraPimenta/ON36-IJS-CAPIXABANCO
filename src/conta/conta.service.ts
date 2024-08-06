import { Injectable, NotFoundException } from '@nestjs/common';
import { Conta } from './models/conta.model';
import { ContaFactory } from './factories/ContaFactory';
import { TipoConta } from './enum/TipoConta';
import { ContaRepository } from './conta.repository';
import { ClienteRepository } from '../cliente/cliente.repository';

@Injectable()
export class ContaService {
  constructor(
    private readonly contaFactory: ContaFactory,
    private readonly contaRepository: ContaRepository,
    private readonly clienteRepository: ClienteRepository,
  ) {}

  criarConta(saldo: number, clienteId: number, tipo: TipoConta): Conta {
    const contas = this.contaRepository.lerContas();
    const novaConta = this.contaFactory.criarConta(
      contas.length > 0 ? contas[contas.length - 1].id + 1 : 1,
      saldo,
      clienteId,
      tipo,
    );
    const clientes = this.clienteRepository.lerClientes();
    const cliente = clientes.find((cliente) => cliente.id === clienteId);

    if (!cliente) {
      throw new NotFoundException(
        'Cliente não encontrado! A conta deve estar atrelada a um cliente existente',
      );
    }

    contas.push(novaConta);
    this.contaRepository.escreverContas(contas);
    return novaConta;
  }

  modificarTipoConta(id: number, tipo: TipoConta): Conta {
    const contas = this.contaRepository.lerContas();
    const conta = contas.find((conta) => conta.id === Number(id));

    if (!conta) {
      throw new NotFoundException('Conta não encontrada!');
    }

    conta.tipo = tipo;
    this.contaRepository.escreverContas(contas);
    return conta;
  }

  removerConta(id: number): void {
    const contas = this.contaRepository.lerContas();
    const contaIndex = contas.findIndex((conta) => conta.id === Number(id));
    contas.splice(contaIndex, 1);
    this.contaRepository.escreverContas(contas);
  }
}
//TODO: Inserir senha pra cliente e/ou gerente
