import { Conta } from '../models/conta.model';
import { ContaPoupanca } from '../models/contaPoupanca.model';
import { ContaCorrente } from '../models/contaCorrente.model';
import { Injectable } from '@nestjs/common';
import { TipoConta } from '../enum/TipoConta';

@Injectable()
export class ContaFactory {
  criarConta(
    id: number,
    saldo: number,
    clienteId: number,
    tipo: TipoConta,
  ): Conta {
    switch (tipo) {
      case TipoConta.CORRENTE:
        return new ContaCorrente(id, saldo, clienteId, tipo);
      case TipoConta.POUPANCA:
        return new ContaPoupanca(id, saldo, clienteId, tipo);
      default:
        throw new Error('Tipo de conta inválido');
    }
  }
}
