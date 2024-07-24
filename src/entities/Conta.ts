import { Transacao } from "./Transacao";

export abstract class Conta {
  id: number;
  protected saldo: number;
  clienteId: number;
  transacoes: Transacao[] = [];

  constructor (id: number, saldo: number, clienteId: number) {
    this.id = id;
    this.clienteId = clienteId;
    this.saldo = saldo;
  }

  abstract depositar(valor: number): void;

  abstract sacar(valor: number): void;

  abstract transferir(valor: number, contaDestino: Conta): void;
}