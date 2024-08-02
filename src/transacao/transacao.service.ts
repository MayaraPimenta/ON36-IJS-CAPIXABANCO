import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Conta } from 'src/conta/models/conta.model';
import { Transacao, TipoTransacao } from './models/transacao.model';

@Injectable()
export class TransacaoService {
  //transacao
  // eslint-disable-next-line prettier/prettier
  private readonly transacaoPath = path.resolve('src/transacao/data/transacoes.json');
  private lerTransacoes(): Transacao[] {
    const data = fs.readFileSync(this.transacaoPath, 'utf8');
    return JSON.parse(data) as Transacao[];
  }
  private escreverTransacoes(transacoes: Transacao[]): void {
    fs.writeFileSync(
      this.transacaoPath,
      JSON.stringify(transacoes, null, 2),
      'utf8',
    );
  }

  //conta
  private readonly contaPath = path.resolve('src/conta/data/contas.json');
  private lerContas(): Conta[] {
    const data = fs.readFileSync(this.contaPath, 'utf8');
    return JSON.parse(data) as Conta[];
  }
  private escreverContas(contas: Conta[]): void {
    fs.writeFileSync(this.contaPath, JSON.stringify(contas, null, 2), 'utf8');
  }

  depositar(valor: number, contaId: number): Transacao {
    const contas = this.lerContas();
    const conta = contas.find((conta) => conta.id === Number(contaId));

    if (!conta) {
      throw new NotFoundException('Conta não encontrada!');
    }

    const transacoes = this.lerTransacoes();
    const transacao = new Transacao(
      transacoes.length + 1,
      valor,
      new Date(),
      contaId,
      TipoTransacao.Deposito,
    );

    transacoes.push(transacao);
    this.escreverTransacoes(transacoes);
    conta.saldo = conta.saldo + valor;
    this.escreverContas(contas);

    console.log('Depósito realizado com sucesso!');

    return transacao;
  }

  sacar(valor: number, contaId: number): Transacao | null {
    const contas = this.lerContas();
    const conta = contas.find((conta) => conta.id === Number(contaId));

    if (conta.saldo <= valor) {
      console.log(`Saldo insuficiente! Saldo atual: R$${conta.saldo}`);

      return null;
    }

    const transacoes = this.lerTransacoes();
    const transacao = new Transacao(
      transacoes.length + 1,
      valor,
      new Date(),
      contaId,
      TipoTransacao.Saque,
    );
    transacoes.push(transacao);
    conta.saldo = conta.saldo + valor;
    this.escreverContas(contas);

    console.log(`Saque realizado com sucesso! Saldo atual: R$${conta.saldo}`);

    return transacao;
  }

  transferir(
    valor: number,
    contaId: number,
    contaDestinoId: number,
  ): Transacao | null {
    const contas = this.lerContas();
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

    const transacoes = this.lerTransacoes();
    const transacao = new Transacao(
      transacoes.length + 1,
      valor,
      new Date(),
      contaId,
      TipoTransacao.Transferencia,
    );
    transacoes.push(transacao);
    contaEnvia.saldo = contaEnvia.saldo - valor;
    this.escreverContas(contas);
    this.depositar(valor, contaRecebe.id);

    console.log('Transferencia realizada com sucesso!');

    return transacao;
  }
}
