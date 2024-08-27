import { Injectable, NotFoundException } from '@nestjs/common';
import { Transacao, TipoTransacao } from '../domain/transacao/transacao.model';
import { ContaRepository } from '../adapters/outbound/conta.repository';
import { TransacaoRepository } from '../adapters/outbound/transacao.repository';

@Injectable()
export class TransacaoService {
  constructor(
    private readonly contaRepository: ContaRepository,
    private readonly transacaoRepository: TransacaoRepository,
  ) {}

  depositar(valor: number, contaId: number): Transacao {
    //confere se conta existe - getContaById
    const contas = this.contaRepository.lerContas();
    const conta = contas.find((conta) => conta.id === Number(contaId));

    if (!conta) {
      throw new NotFoundException('Conta não encontrada!');
    }
    //

    const transacoes = this.transacaoRepository.lerTransacoes();
    const transacao = new Transacao(
      transacoes.length + 1,
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

  sacar(valor: number, contaId: number): Transacao | null {
    const contas = this.contaRepository.lerContas();
    const conta = contas.find((conta) => conta.id === Number(contaId));

    if (conta.saldo <= valor) {
      console.log(`Saldo insuficiente! Saldo atual: R$${conta.saldo}`);

      return null;
    }

    const transacoes = this.transacaoRepository.lerTransacoes();
    const transacao = new Transacao(
      transacoes.length + 1,
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
    contaId: number,
    contaDestinoId: number,
  ): Transacao | null {
    const contas = this.contaRepository.lerContas();
    const contaEnvia = contas.find((conta) => conta.id === Number(contaId));
    const contaRecebe = contas.find(
      (conta) => conta.id === Number(contaDestinoId),
    );

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
      transacoes.length + 1,
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
}
