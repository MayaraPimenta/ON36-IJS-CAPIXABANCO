import { Iendereco } from '../cep/Iendereco';

export class Pessoa {
  constructor(
    public nome: string,
    public endereco: Iendereco,
    public telefone: string,
  ) {}
}
