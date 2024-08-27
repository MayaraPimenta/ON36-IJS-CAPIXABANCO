import { Iendereco } from '../cep/Iendereco';

export class Pessoa {
  constructor(
    public nome: string,
    public id: number,
    public endereco: Iendereco,
    public telefone: string,
  ) {}
}
