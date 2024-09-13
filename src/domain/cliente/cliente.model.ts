import { Pessoa } from '../pessoa/pessoa.model';
import { Conta } from '../conta/conta.model';
import { Iendereco } from '../cep/Iendereco';
export class Cliente extends Pessoa {
  contas: Conta[] = [];
  id: string;

  constructor(nome: string, endereco: Iendereco, telefone: string) {
    super(nome, endereco, telefone);
  }
}
