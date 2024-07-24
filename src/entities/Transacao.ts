export class Transacao {
  id: number;
  valor: number;
  dateTime: Date;
  contaId: number;
  tipo: TipoTransacao;

  constructor (id: number, valor: number, dateTime: Date, contaId: number, tipo: TipoTransacao) {
    this.id = id;
    this.valor = valor;
    this.dateTime = dateTime;
    this.contaId = contaId;
    this.tipo = tipo;
  }
}