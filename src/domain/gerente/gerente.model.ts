import { Iendereco } from '../cep/Iendereco';
import { Pessoa } from '../pessoa/pessoa.model';
export class Gerente extends Pessoa {
  id: number;

  constructor(nome: string, endereco: Iendereco, telefone: string) {
    super(nome, endereco, telefone);
  }
}
