import { Conta } from './conta.model';
import { TipoConta } from './TipoConta';

export class ContaCorrente extends Conta {
  limiteChequeEspecial: number;

  constructor(saldo: number, clienteId: number, tipo: TipoConta) {
    super(saldo, clienteId, tipo);
  }
}
