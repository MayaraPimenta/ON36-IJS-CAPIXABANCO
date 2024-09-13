import { Conta } from './conta.model';
import { ContaPoupanca } from './contaPoupanca.model';
import { ContaCorrente } from './contaCorrente.model';
import { Injectable } from '@nestjs/common';
import { TipoConta } from './TipoConta';

@Injectable()
export class ContaFactory {
  criarConta(saldo: number, clienteId: string, tipo: TipoConta): Conta {
    switch (tipo) {
      case TipoConta.CORRENTE:
        return new ContaCorrente(saldo, clienteId, tipo);
      case TipoConta.POUPANCA:
        return new ContaPoupanca(saldo, clienteId, tipo);
      default:
        throw new Error('Tipo de conta inválido');
    }
  }
}
