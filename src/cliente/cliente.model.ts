import { Pessoa } from 'src/pessoa/pessoa.model';
import { Conta } from '../conta/conta.model';
export class Cliente extends Pessoa {
  contas: Conta[] = [];

  constructor(nome: string, id: number, endereco: string, telefone: string) {
    super(nome, id, endereco, telefone);
  }
}
