import { Pessoa } from '../pessoa/pessoa.model';
import { Conta } from '../conta/conta.model';
import { Iendereco } from '../cep/Iendereco';
export class Cliente extends Pessoa {
  contas: Conta[] = [];

  constructor(nome: string, id: number, endereco: Iendereco, telefone: string) {
    super(nome, id, endereco, telefone);
  }
}
