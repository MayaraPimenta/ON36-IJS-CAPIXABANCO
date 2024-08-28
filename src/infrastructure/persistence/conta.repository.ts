import * as path from 'path';
import * as fs from 'fs';
import { Conta } from '../../domain/conta/conta.model';
import { Injectable } from '@nestjs/common';
import { ContaFactory } from '../../domain/conta/ContaFactory';
import { TipoConta } from 'src/domain/conta/TipoConta';

@Injectable()
export class ContaRepository {
  constructor(private readonly contaFactory: ContaFactory) {}
  readonly filePath = path.resolve('src/data/contas.json');

  lerContas(): Conta[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Conta[];
  }

  escreverContas(contas: Conta[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(contas, null, 2), 'utf8');
  }

  criarConta(saldo: number, clienteId: number, tipo: TipoConta): Conta {
    const contas = this.lerContas();
    const novaConta = this.contaFactory.criarConta(
      contas.length > 0 ? contas[contas.length - 1].id + 1 : 1,
      saldo,
      clienteId,
      tipo,
    );

    contas.push(novaConta);
    this.escreverContas(contas);
    return novaConta;
  }

  modificarTipoConta(id: number, tipo: TipoConta): Conta {
    const contas = this.lerContas();
    const conta = contas.find((conta) => conta.id === Number(id));

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

  getContaById(id: number): Conta {
    const contas = this.lerContas();
    const conta = contas.find((conta) => conta.id === Number(id));

    return conta;
  }
}
