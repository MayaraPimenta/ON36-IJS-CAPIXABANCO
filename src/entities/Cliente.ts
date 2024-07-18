import { Conta } from "./Conta";

export class Cliente {
  nome: string;
  id: number;
  endereco: string;
  telefone: string;
  contas: Conta[] = [];

  constructor (nome: string, id: number, endereco: string, telefone: string) {
    this.nome = nome;
    this.id = id;
    this.endereco = endereco;
    this.telefone = telefone;
  }
}