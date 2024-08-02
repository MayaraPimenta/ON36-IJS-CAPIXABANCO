import { Conta } from 'src/conta/models/conta.model';
import { TipoConta } from '../enum/TipoConta';

export class ContaPoupanca extends Conta {
  rendimentoMensal: number;

  constructor(id: number, saldo: number, clienteId: number, tipo: TipoConta) {
    super(id, saldo, clienteId, tipo);
  }
}
