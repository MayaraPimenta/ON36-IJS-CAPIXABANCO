import { Injectable } from '@nestjs/common';
import { TipoTransacao, Transacao } from 'src/transacao/models/transacao.model';
export enum TipoConta {
  CORRENTE = 'corrente',
  POUPANCA = 'poupanca',
}

@Injectable()
export class Conta {
  transacoes: Transacao[] = [];

  constructor(
    public id: number,
    public saldo: number,
    public clienteId: number,
    public tipo: TipoConta,
  ) {}

  depositar(valor: number): Transacao {
    //ao inves de fazer isso, criar uma getTransacoes pra pegar o atributo transacoes?
    const idTransacao = this.transacoes.length + 1;
    const transacao = new Transacao(
      idTransacao,
      valor,
      new Date(),
      this.id,
      TipoTransacao.Deposito,
    );
    this.transacoes.push(transacao);
    this.saldo = this.saldo + valor;

    console.log('Depósito realizado com sucesso!');

    return transacao;
  }

  sacar(valor: number): Transacao | null {
    if (this.saldo <= valor) {
      console.log(`Saldo insuficiente! Saldo atual: R$${this.saldo}`);

      return null;
    }

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

    console.log(`Saque realizado com sucesso! Saldo atual: R$${this.saldo}`);

    return transacao;
  }

  transferir(valor: number, contaDestino: Conta): Transacao | null {
    if (this.saldo <= valor) {
      console.log(`Saldo insuficiente! Saldo atual: R$${this.saldo}`);

      return null;
    }

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

    return transacao;
  }
}
