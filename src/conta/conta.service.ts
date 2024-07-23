import { Injectable } from '@nestjs/common';
import { Conta, TipoConta } from './conta.model';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ContaService {
  //adicionado temporariamente devido a falta de um DB
  private readonly filePath = path.resolve('src/conta/contas.json');

  private lerContas(): Conta[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Conta[];
  }

  private escreverContas(accounts: Conta[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf8');
  }

  criarConta(saldo: number, clienteId: number, tipo: TipoConta): Conta {
    const contas = this.lerContas();
    const novaConta = {
      id: contas.length > 0 ? contas[contas.length - 1].id + 1 : 1,
      saldo,
      tipo,
      clienteId,
    };

    contas.push(novaConta);
    this.escreverContas(contas);
    return novaConta;
  }

  modificarTipoConta(id: number, tipo: TipoConta): Conta {
    const contas = this.lerContas();
    const conta = contas.find((account) => account.id === Number(id));

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
}
