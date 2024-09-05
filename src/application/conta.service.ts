import { Injectable, NotFoundException } from '@nestjs/common';
import { Conta } from '../domain/conta/conta.model';
import { ContaRepository } from '../infrastructure/persistence/conta/conta.repository';
import { ClienteRepository } from '../infrastructure/persistence/cliente/cliente.repository';

@Injectable()
export class ContaService {
  constructor(
    private readonly contaRepository: ContaRepository,
    private readonly clienteRepository: ClienteRepository,
  ) {}

  async criar(criarContaDto): Promise<Conta> {
    const cliente = this.clienteRepository.getCliente(criarContaDto.clienteId);
    if (!cliente) {
      throw new NotFoundException(
        'Cliente não encontrado! A conta deve estar atrelada a um cliente existente',
      );
    }

    const conta = new Conta(
      criarContaDto.saldo,
      criarContaDto.clienteId,
      criarContaDto.tipo,
    );

    return this.contaRepository.salvar(conta);
  }

  updateTipoConta(updateContaDto): Promise<Conta> {
    return this.contaRepository.updateTipoConta(
      updateContaDto.id,
      updateContaDto.tipo,
    );
  }

  removerConta(id: string): void {
    this.contaRepository.remover(id);
  }
}
//TODO: Inserir senha pra cliente e/ou gerente
