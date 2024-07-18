import { Conta } from "./Conta";
import { Transacao } from "./Transacao";
import { TipoTransacao } from "../enums/TipoTransacao";

export class ContaCorrente extends Conta {
  limiteChequeEspecial: number;
  
  constructor (id: number, saldo: number, clienteId: number, limiteChequeEspecial: number) {
    super(id, saldo, clienteId);
    this.limiteChequeEspecial = limiteChequeEspecial;
  }

  private verificaSaldo(valor: number): boolean {
    return valor < 0 && Math.abs(valor) <= this.limiteChequeEspecial;
  }

  depositar(valor: number): void {
    const idTransacao = this.transacoes.length+1;
    const transacao = new Transacao(idTransacao, valor, new Date(), this.id, TipoTransacao.Deposito);
    this.transacoes.push(transacao);
    this.saldo = this.saldo + valor;

    console.log('Depósito realizado com sucesso!');
  };

  sacar(valor: number): void {
    const valorRestante = this.saldo - valor;

    if (this.verificaSaldo(valorRestante)) {
      const idTransacao = this.transacoes.length+1;
      const transacao = new Transacao(idTransacao, valor, new Date(), this.id, TipoTransacao.Saque);
      this.transacoes.push(transacao);
      this.saldo = valorRestante;

      console.log(`Saque realizado com sucesso! Saldo atual: R$${this.saldo}`);
    }

    console.log(`Saldo insuficiente! Saldo atual: R$${this.saldo}
      | Limite Cheque especial: R$${this.limiteChequeEspecial}`);
  };

  transferir(valor: number, contaDestino: Conta): void {
    const valorRestante = this.saldo - valor;

    if (this.verificaSaldo(valorRestante)) {
      const idTransacao = this.transacoes.length+1;
      const transacao = new Transacao(idTransacao, valor, new Date(), this.id, TipoTransacao.Transferencia);
      this.transacoes.push(transacao);
      this.saldo = valorRestante;

      contaDestino.depositar(valor);

      console.log('Transferencia realizada com sucesso!');
    }
  };
}