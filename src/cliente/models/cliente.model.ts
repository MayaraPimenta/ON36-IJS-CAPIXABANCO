import { Pessoa } from '../../pessoa/models/pessoa.model';
import { Conta } from '../../conta/models/conta.model';
export class Cliente extends Pessoa {
  contas: Conta[] = [];

  constructor(nome: string, id: number, endereco: string, telefone: string) {
    super(nome, id, endereco, telefone);
  }
}
