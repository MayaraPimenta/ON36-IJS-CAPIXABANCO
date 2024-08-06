import { Pessoa } from 'src/pessoa/models/pessoa.model';
import { Conta } from 'src/conta/models/conta.model';
export class Cliente extends Pessoa {
  contas: Conta[] = [];

  constructor(nome: string, id: number, endereco: string, telefone: string) {
    super(nome, id, endereco, telefone);
  }
}
