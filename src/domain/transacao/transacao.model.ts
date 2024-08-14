export enum TipoTransacao {
  Saque = 1,
  Deposito,
  Transferencia,
}

export class Transacao {
  constructor(
    public id: number,
    public valor: number,
    public dateTime: Date,
    public contaId: number,
    public tipo: TipoTransacao,
  ) {}
}
