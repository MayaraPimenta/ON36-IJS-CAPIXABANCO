import { Conta } from '../models/conta.model';
import { TipoConta } from '../enum/TipoConta';

export class ContaCorrente extends Conta {
  limiteChequeEspecial: number;

  constructor(id: number, saldo: number, clienteId: number, tipo: TipoConta) {
    super(id, saldo, clienteId, tipo);
  }
}
