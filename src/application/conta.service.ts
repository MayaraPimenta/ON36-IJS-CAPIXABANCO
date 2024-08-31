import { Injectable, NotFoundException } from '@nestjs/common';
import { Conta } from '../domain/conta/conta.model';
import { TipoConta } from '../domain/conta/TipoConta';
import { ContaRepository } from '../infrastructure/persistence/conta/conta.repository';
import { ClienteRepository } from '../infrastructure/persistence/cliente/cliente.repository';

@Injectable()
export class ContaService {
  constructor(
    private readonly contaRepository: ContaRepository,
    private readonly clienteRepository: ClienteRepository,
  ) {}

  async criarConta(
    saldo: number,
    clienteId: string,
    tipo: TipoConta,
  ): Promise<Conta> {
    const cliente = this.clienteRepository.getCliente(clienteId);
    if (!cliente) {
      throw new NotFoundException(
        'Cliente não encontrado! A conta deve estar atrelada a um cliente existente',
      );
    }

    const conta = new Conta(saldo, clienteId, tipo);

    return this.contaRepository.salvar(conta);
  }

  modificarTipoConta(id: string, tipo: TipoConta): Promise<Conta> {
    return this.contaRepository.modificarTipoConta(id, tipo);
  }

  removerConta(id: string): void {
    this.contaRepository.remover(id);
  }
}
//TODO: Inserir senha pra cliente e/ou gerente
