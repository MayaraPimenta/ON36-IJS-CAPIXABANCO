export class Pessoa {
  nome: string;
  id: number;
  endereco: string;
  telefone: string;

  constructor(nome: string, id: number, endereco: string, telefone: string) {
    this.nome = nome;
    this.id = id;
    this.endereco = endereco;
    this.telefone = telefone;
  }
}
