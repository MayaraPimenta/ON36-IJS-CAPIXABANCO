import { TipoTransacao } from '../transacao/TipoTransacao';
import { Transacao } from '../transacao/transacao.model';
import { Conta } from './conta.model';
import { TipoConta } from './TipoConta';

export class ContaPoupanca extends Conta {
  rendimentoMensal: number;

  constructor(saldo: number, clienteId: string, tipo: TipoConta) {
    super(saldo, clienteId, tipo);
  }

  sacar(valor: number): void {
    if (this.saldo <= valor) {
      throw new Error(`Saldo insuficiente! Saldo atual: R$${this.saldo}`);
    }

    const transacao = new Transacao(
      valor,
      new Date(),
      this.id,
      TipoTransacao.Saque,
    );
    this.saldo -= valor;
    this.transacoes.push(transacao);
  }
}
