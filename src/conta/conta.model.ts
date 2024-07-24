import { Cliente } from 'src/cliente/cliente.model';
export enum TipoConta {
  CORRENTE = 'corrente',
  POUPANCA = 'poupanca',
}

export abstract class Conta {
  id: number;
  saldo: number;
  clienteId: Cliente['id'];
  tipo: TipoConta;

  constructor(id: number, saldo: number, clienteId: number, tipo: TipoConta) {
    this.id = id;
    this.clienteId = clienteId;
    this.saldo = saldo;
    this.tipo = tipo;
  }
}
