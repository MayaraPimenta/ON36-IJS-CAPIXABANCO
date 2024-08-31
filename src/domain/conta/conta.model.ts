import { Transacao } from '../transacao/transacao.model';
import { TipoConta } from './TipoConta';
export class Conta {
  transacoes: Transacao[] = [];
  id: number;

  constructor(
    public saldo: number,
    public clienteId: number,
    public tipo: TipoConta,
  ) {}
}
//TODO: Adicionar metodos especificos de contaCorrente e contaPoupanca
