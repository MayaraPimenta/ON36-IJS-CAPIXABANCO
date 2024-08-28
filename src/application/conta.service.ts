import { Injectable, NotFoundException } from '@nestjs/common';
import { Conta } from '../domain/conta/conta.model';
import { TipoConta } from '../domain/conta/TipoConta';
import { ContaRepository } from '../infrastructure/persistence/conta.repository';
import { ClienteRepository } from '../infrastructure/persistence/cliente.repository';
import { TextResponse } from '../types/global';

@Injectable()
export class ContaService {
  constructor(
    private readonly contaRepository: ContaRepository,
    private readonly clienteRepository: ClienteRepository,
  ) {}

  criarConta(saldo: number, clienteId: number, tipo: TipoConta): Conta {
    const cliente = this.clienteRepository.getClienteById(clienteId);
    if (!cliente) {
      throw new NotFoundException(
        'Cliente não encontrado! A conta deve estar atrelada a um cliente existente',
      );
    }

    return this.contaRepository.criarConta(saldo, clienteId, tipo);
  }

  modificarTipoConta(id: number, tipo: TipoConta): Conta {
    const conta = this.contaRepository.getContaById(id);

    if (!conta) {
      throw new NotFoundException('Conta não encontrada!');
    }

    return this.contaRepository.modificarTipoConta(id, tipo);
  }

  removerConta(id: number): TextResponse {
    const conta = this.contaRepository.getContaById(id);
    if (!conta) {
      throw new NotFoundException('Conta não encontrada!');
    }

    this.contaRepository.removerConta(id);
    const contaRemovida = this.contaRepository.getContaById(id);
    if (contaRemovida) {
      throw new Error('Algo deu errado, conta não removida.');
    }
    return { message: 'Conta deletada com sucesso!' };
  }
}
//TODO: Inserir senha pra cliente e/ou gerente
