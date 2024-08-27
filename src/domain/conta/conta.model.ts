import { Transacao } from '../transacao/transacao.model';
import { TipoConta } from './TipoConta';
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
