import { Iendereco } from '../cep/Iendereco';
import { Pessoa } from '../pessoa/pessoa.model';
export class Gerente extends Pessoa {
  constructor(nome: string, id: number, endereco: Iendereco, telefone: string) {
    super(nome, id, endereco, telefone);
  }
}
