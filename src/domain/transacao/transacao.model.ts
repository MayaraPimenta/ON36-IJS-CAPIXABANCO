import { TipoTransacao } from './TipoTransacao';

export class Transacao {
  id: string;

  constructor(
    public valor: number,
    public dateTime: Date,
    public contaId: string,
    public tipo: TipoTransacao,
  ) {}
}
