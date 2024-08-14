import { Conta } from './conta.model';
import { TipoConta } from './TipoConta';

export class ContaCorrente extends Conta {
  limiteChequeEspecial: number;

  constructor(id: number, saldo: number, clienteId: number, tipo: TipoConta) {
    super(id, saldo, clienteId, tipo);
  }
}
