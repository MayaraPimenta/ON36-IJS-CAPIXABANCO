import { Cliente } from '../cliente/cliente.model';
import { TipoPessoa } from '../../domain/pessoa/TipoPessoa';
import { Pessoa } from '../../domain/pessoa/pessoa.model';
import { Gerente } from '../gerente/gerente.model';
import { Iendereco } from '../cep/Iendereco';

export class PessoaFactory extends Pessoa {
  criarPessoa(
    nome: string,
    endereco: Iendereco,
    telefone: string,
    tipo: TipoPessoa,
  ): Pessoa {
    switch (tipo) {
      case TipoPessoa.CLIENTE:
        return new Cliente(nome, endereco, telefone);
      case TipoPessoa.GERENTE:
        return new Gerente(nome, endereco, telefone);
      default:
        throw new Error('Tipo de conta inválido');
    }
  }
}
