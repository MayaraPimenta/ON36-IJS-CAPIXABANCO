import { Conta, TipoConta } from 'src/conta/models/conta.model';

export class ContaCorrente extends Conta {
  limiteChequeEspecial: number;

  constructor(id: number, saldo: number, clienteId: number, tipo: TipoConta) {
    super(id, saldo, clienteId, tipo);
  }

  private verificaSaldo(valor: number): boolean {
    return valor < 0 && Math.abs(valor) <= this.limiteChequeEspecial;
  }

  // override sacar(valor: number): Transacao | null {
  //   const valorRestante = this.saldo - valor;

  //   if (!this.verificaSaldo(valorRestante)) {
  //     console.log(`Saldo insuficiente! Saldo atual: R$${this.saldo}
  //       | Limite Cheque especial: R$${this.limiteChequeEspecial}`);

  //     return null;
  //   }

  //   const idTransacao = this.transacoes.length + 1;
  //   const transacao = new Transacao(
  //     idTransacao,
  //     valor,
  //     new Date(),
  //     this.id,
  //     TipoTransacao.Saque,
  //   );
  //   this.transacoes.push(transacao);
  //   this.saldo = valorRestante;

  //   console.log(`Saque realizado com sucesso! Saldo atual: R$${this.saldo}`);

  //   return transacao;
  // }

  // override transferir(valor: number, contaDestino: Conta): Transacao | null {
  //   const valorRestante = this.saldo - valor;

  //   if (!this.verificaSaldo(valorRestante)) {
  //     console.log(`Saldo insuficiente! Saldo atual: R$${this.saldo}`);

  //     return null;
  //   }

  //   const idTransacao = this.transacoes.length + 1;
  //   const transacao = new Transacao(
  //     idTransacao,
  //     valor,
  //     new Date(),
  //     this.id,
  //     TipoTransacao.Transferencia,
  //   );
  //   this.transacoes.push(transacao);
  //   this.saldo = valorRestante;

  //   contaDestino.depositar(valor);

  //   console.log('Transferencia realizada com sucesso!');

  //   return transacao;
  // }
}
