import { Transacao } from 'src/transacao/models/transacao.model';
import { TipoConta } from '../enum/TipoConta';
export class Conta {
  transacoes: Transacao[] = [];

  constructor(
    public id: number,
    public saldo: number,
    public clienteId: number,
    public tipo: TipoConta,
  ) {}
}
//TODO: Adicionar metodos especificos de contaCorrente e contaPoupanca
