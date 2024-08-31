import { Conta } from './conta.model';
import { TipoConta } from './TipoConta';

export class ContaPoupanca extends Conta {
  rendimentoMensal: number;

  constructor(saldo: number, clienteId: number, tipo: TipoConta) {
    super(saldo, clienteId, tipo);
  }
}
