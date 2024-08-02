import { Cliente } from 'src/cliente/models/cliente.model';
import { TipoPessoa } from '../enum/TipoPessoa';
import { Pessoa } from '../models/pessoa.model';
import { Gerente } from 'src/gerente/models/gerente.model';

export class PessoaFactory extends Pessoa {
  criarPessoa(
    nome: string,
    id: number,
    endereco: string,
    telefone: string,
    tipo: TipoPessoa,
  ): Pessoa {
    switch (tipo) {
      case TipoPessoa.CLIENTE:
        return new Cliente(nome, id, endereco, telefone);
      case TipoPessoa.GERENTE:
        return new Gerente(nome, id, endereco, telefone);
      default:
        throw new Error('Tipo de conta inválido');
    }
  }
}
