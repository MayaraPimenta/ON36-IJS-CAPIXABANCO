import { Conta } from './Conta';
import { Transacao } from './Transacao';
import { TipoTransacao } from '../enums/TipoTransacao';

export class ContaPoupanca extends Conta {
  rendimentoMensal: number;

  constructor(
    id: number,
    saldo: number,
    clienteId: number,
    rendimentoMensal: number,
  ) {
    super(id, saldo, clienteId);
    this.rendimentoMensal = rendimentoMensal;
  }

  depositar(valor: number): void {
    const idTransacao = this.transacoes.length + 1;
    const transacao = new Transacao(
      idTransacao,
      valor,
      new Date(),
      this.id,
      TipoTransacao.Deposito,
    );
    this.transacoes.push(transacao);

    const saldoAtualizado = this.saldo + valor;
    const valorRendimento = saldoAtualizado * this.rendimentoMensal;
    this.saldo = saldoAtualizado + valorRendimento;

    console.log('Depósito realizado com sucesso!');
  }

  sacar(valor: number): void {
    if (this.saldo >= valor) {
      const idTransacao = this.transacoes.length + 1;
      const transacao = new Transacao(
        idTransacao,
        valor,
        new Date(),
        this.id,
        TipoTransacao.Saque,
      );
      this.transacoes.push(transacao);
      this.saldo = this.saldo - valor;
    }

    console.log(`Saldo insuficiente! Saldo atual: R$${this.saldo}`);
  }

  transferir(valor: number, contaDestino: Conta): void {
    if (this.saldo >= valor) {
      const idTransacao = this.transacoes.length + 1;
      const transacao = new Transacao(
        idTransacao,
        valor,
        new Date(),
        this.id,
        TipoTransacao.Transferencia,
      );
      this.transacoes.push(transacao);
      this.saldo = this.saldo - valor;

      contaDestino.depositar(valor);

      console.log('Transferencia realizada com sucesso!');
    }
  }
}
