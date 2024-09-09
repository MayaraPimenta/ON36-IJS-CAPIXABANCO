import { TipoTransacao } from '../transacao/TipoTransacao';
import { Transacao } from '../transacao/transacao.model';
import { Conta } from './conta.model';
import { TipoConta } from './TipoConta';

export class ContaCorrente extends Conta {
  limiteChequeEspecial: number;

  constructor(saldo: number, clienteId: string, tipo: TipoConta) {
    super(saldo, clienteId, tipo);
  }

  private verificaSaldo(valor: number): boolean {
    return valor < 0 && Math.abs(valor) <= this.limiteChequeEspecial;
  }

  sacar(valor: number): void {
    const valorRestante = this.saldo - valor;
    if (!this.verificaSaldo(valorRestante)) {
      throw new Error(`Saldo insuficiente! Saldo atual: R$${this.saldo}
        | Limite Cheque especial: R$${this.limiteChequeEspecial}`);
    }

    const transacao = new Transacao(
      valor,
      new Date(),
      this.id,
      TipoTransacao.Saque,
    );
    this.saldo = valorRestante;
    this.transacoes.push(transacao);
  }
}
