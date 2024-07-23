import { Conta } from '../conta/conta.model';
import { Gerente } from '../gerente/gerente.model';

export class Cliente {
  nome: string;
  id: number;
  endereco: string;
  telefone: string;
  contas: Conta[] = [];
  gerenteId: Gerente['id'];

  constructor(
    nome: string,
    id: number,
    endereco: string,
    telefone: string,
    gerenteId: number,
  ) {
    this.nome = nome;
    this.id = id;
    this.endereco = endereco;
    this.telefone = telefone;
    this.gerenteId = gerenteId;
  }
}
