import { Conta, TipoConta } from 'src/conta/models/conta.model';

export class ContaPoupanca extends Conta {
  rendimentoMensal: number;

  constructor(id: number, saldo: number, clienteId: number, tipo: TipoConta) {
    super(id, saldo, clienteId, tipo);
  }
}
