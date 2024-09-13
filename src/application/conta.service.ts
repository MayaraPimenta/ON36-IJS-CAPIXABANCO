import { Injectable, NotFoundException } from '@nestjs/common';
import { Conta } from '../domain/conta/conta.model';
import { ContaRepository } from '../infrastructure/persistence/conta/conta.repository';
import { ClienteRepository } from '../infrastructure/persistence/cliente/cliente.repository';
import { ContaFactory } from '../domain/conta/ContaFactory';
import { ContaCorrenteStrategy } from '../domain/conta/strategy/ContaCorrenteStrategy';
import { ContaPoupancaStrategy } from '../domain/conta/strategy/ContaPoupancaStrategy';
import { ContaCorrente } from 'src/domain/conta/contaCorrente.model';
import { ContaPoupanca } from 'src/domain/conta/contaPoupanca.model';

@Injectable()
export class ContaService {
  constructor(
    private readonly contaRepository: ContaRepository,
    private readonly clienteRepository: ClienteRepository,
    private contaCorrenteStrategy: ContaCorrenteStrategy,
    private contaPoupancaStrategy: ContaPoupancaStrategy,
  ) {}

  async criar(criarContaDto): Promise<Conta> {
    const cliente = this.clienteRepository.getCliente(criarContaDto.clienteId);
    if (!cliente) {
      throw new NotFoundException(
        'Cliente não encontrado! A conta deve estar atrelada a um cliente existente',
      );
    }

    const conta = new ContaFactory();
    const novaConta = conta.criarConta(
      criarContaDto.saldo,
      criarContaDto.clienteId,
      criarContaDto.tipo,
    );

    return this.contaRepository.salvar(novaConta);
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

  async sacar(transacaoDto): Promise<void> {
    const conta = await this.contaRepository.getConta(transacaoDto.id);

    if (conta.tipo === 'corrente') {
      this.contaCorrenteStrategy.sacar(
        conta as ContaCorrente,
        transacaoDto.valor,
      );
    } else if (conta.tipo === 'poupanca') {
      this.contaPoupancaStrategy.sacar(
        conta as ContaPoupanca,
        transacaoDto.valor,
      );
    }
  }
}
//TODO: Inserir senha pra cliente e/ou gerente
