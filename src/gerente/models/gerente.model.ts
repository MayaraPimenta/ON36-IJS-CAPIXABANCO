import { Pessoa } from '../../pessoa/models/pessoa.model';
export class Gerente extends Pessoa {
  constructor(nome: string, id: number, endereco: string, telefone: string) {
    super(nome, id, endereco, telefone);
  }
}
