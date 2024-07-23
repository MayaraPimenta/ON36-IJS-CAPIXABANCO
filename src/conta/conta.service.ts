import { Injectable, NotFoundException } from '@nestjs/common';
import { Conta, TipoConta } from './conta.model';
import * as path from 'path';
import * as fs from 'fs';
import { Cliente } from 'src/cliente/cliente.model';

@Injectable()
export class ContaService {
  private readonly filePath = path.resolve('src/conta/contas.json');
  private lerContas(): Conta[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Conta[];
  }
  private escreverContas(contas: Conta[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(contas, null, 2), 'utf8');
  }

  private readonly clienteFilePath = path.resolve('src/cliente/clientes.json');
  private lerClientes(): Cliente[] {
    const data = fs.readFileSync(this.clienteFilePath, 'utf8');
    return JSON.parse(data) as Cliente[];
  }

  criarConta(saldo: number, clienteId: number, tipo: TipoConta): Conta {
    const contas = this.lerContas();
    const novaConta = {
      id: contas.length > 0 ? contas[contas.length - 1].id + 1 : 1,
      saldo,
      tipo,
      clienteId,
    };
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
}
