import { Injectable, NotFoundException } from '@nestjs/common';
import { Conta, TipoConta } from './models/conta.model';
import { ContaFactory } from './factories/ContaFactory';
import * as path from 'path';
import * as fs from 'fs';
import { Cliente } from 'src/cliente/models/cliente.model';
import { Transacao } from 'src/transacao/models/transacao.model';

@Injectable()
export class ContaService {
  constructor(private readonly contaFactory: ContaFactory) {}

  //conta
  private readonly filePath = path.resolve('src/conta/data/contas.json');
  private lerContas(): Conta[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Conta[];
  }
  private escreverContas(contas: Conta[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(contas, null, 2), 'utf8');
  }

  //cliente
  // eslint-disable-next-line prettier/prettier
  private readonly clienteFilePath = path.resolve('src/cliente/data/clientes.json');
  private lerClientes(): Cliente[] {
    const data = fs.readFileSync(this.clienteFilePath, 'utf8');
    return JSON.parse(data) as Cliente[];
  }

  //transacao
  // eslint-disable-next-line prettier/prettier
  private readonly transacaoFilePath = path.resolve('src/transacao/data/transacoes.json');
  private lerTransacoes(): Transacao[] {
    const data = fs.readFileSync(this.transacaoFilePath, 'utf8');
    return JSON.parse(data) as Transacao[];
  }
  private escreverTransacoes(transacoes: Transacao[]): void {
    fs.writeFileSync(
      this.transacaoFilePath,
      JSON.stringify(transacoes, null, 2),
      'utf8',
    );
  }

  criarConta(saldo: number, clienteId: number, tipo: TipoConta): Conta {
    const contas = this.lerContas();
    const novaConta = this.contaFactory.criarConta(
      contas.length > 0 ? contas[contas.length - 1].id + 1 : 1,
      saldo,
      clienteId,
      tipo,
    );
    const clientes = this.lerClientes();
    const cliente = clientes.find((cliente) => cliente.id === clienteId);

    if (!cliente) {
      throw new NotFoundException(
        'Cliente não encontrado! A conta deve estar atrelada a um cliente existente',
      );
    }

    contas.push(novaConta);
    this.escreverContas(contas);
    return novaConta;
  }

  modificarTipoConta(id: number, tipo: TipoConta): Conta {
    const contas = this.lerContas();
    const conta = contas.find((conta) => conta.id === Number(id));

    if (!conta) {
      throw new NotFoundException('Conta não encontrada!');
    }

    conta.tipo = tipo;
    this.escreverContas(contas);
    return conta;
  }

  removerConta(id: number): void {
    const contas = this.lerContas();
    const contaIndex = contas.findIndex((conta) => conta.id === Number(id));
    contas.splice(contaIndex, 1);
    this.escreverContas(contas);
  }

  depositar(valor: number, contaId: number): Transacao {
    const contas = this.lerContas();
    const conta: Conta = contas.find(
      (conta: Conta) => conta.id === Number(contaId),
    );
    const transacoes = this.lerTransacoes();

    if (!conta) {
      throw new NotFoundException('Conta não encontrada!');
    }

    const transacao = conta.depositar(valor);
    transacoes.push(transacao);
    this.escreverTransacoes(transacoes);

    return transacao;
  }
}
