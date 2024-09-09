import { Injectable, NotFoundException } from '@nestjs/common';
import { Transacao } from '../domain/transacao/transacao.model';
import { ContaRepository } from '../infrastructure/persistence/conta/conta.repository';
import { TransacaoRepository } from '../infrastructure/persistence/transacao.repository';
import { TipoTransacao } from 'src/domain/transacao/TipoTransacao';

@Injectable()
export class TransacaoService {
  constructor(
    private readonly contaRepository: ContaRepository,
    private readonly transacaoRepository: TransacaoRepository,
  ) {}

  depositar(valor: number, contaId: string): Transacao {
    //confere se conta existe - getContaById
    const contas = this.contaRepository.lerContas();
    const conta = contas.find((conta) => conta.id === contaId);

    if (!conta) {
      throw new NotFoundException('Conta não encontrada!');
    }
    //

    const transacoes = this.transacaoRepository.lerTransacoes();
    const transacao = new Transacao(
      valor,
      new Date(),
      contaId,
      TipoTransacao.Deposito,
    );

    transacoes.push(transacao);
    this.transacaoRepository.escreverTransacoes(transacoes);
    conta.saldo = conta.saldo + valor;
    this.contaRepository.escreverContas(contas);

    console.log('Depósito realizado com sucesso!');

    return transacao;
  }

  sacar(valor: number, contaId: string): Transacao | null {
    const contas = this.contaRepository.lerContas();
    const conta = contas.find((conta) => conta.id === contaId);

    if (conta.saldo <= valor) {
      console.log(`Saldo insuficiente! Saldo atual: R$${conta.saldo}`);

      return null;
    }

    const transacoes = this.transacaoRepository.lerTransacoes();
    const transacao = new Transacao(
      valor,
      new Date(),
      contaId,
      TipoTransacao.Saque,
    );
    transacoes.push(transacao);
    conta.saldo = conta.saldo + valor;
    this.contaRepository.escreverContas(contas);

    console.log(`Saque realizado com sucesso! Saldo atual: R$${conta.saldo}`);

    return transacao;
  }

  transferir(
    valor: number,
    contaId: string,
    contaDestinoId: string,
  ): Transacao | null {
    const contas = this.contaRepository.lerContas();
    const contaEnvia = contas.find((conta) => conta.id === contaId);
    const contaRecebe = contas.find((conta) => conta.id === contaDestinoId);

    console.log(contaEnvia, contaRecebe);

    if (!contaEnvia || !contaRecebe) {
      console.log('Alguma conta não foi encontrada!');

      return null;
    }

    if (contaEnvia.saldo <= valor) {
      console.log(`Saldo insuficiente! Saldo atual: R$${contaEnvia.saldo}`);

      return null;
    }

    const transacoes = this.transacaoRepository.lerTransacoes();
    const transacao = new Transacao(
      valor,
      new Date(),
      contaId,
      TipoTransacao.Transferencia,
    );
    transacoes.push(transacao);
    contaEnvia.saldo = contaEnvia.saldo - valor;
    this.contaRepository.escreverContas(contas);
    this.depositar(valor, contaRecebe.id);

    console.log('Transferencia realizada com sucesso!');

    return transacao;
  }

  salvar(transacao: Transacao) {
    console.log(transacao);
  }
}
