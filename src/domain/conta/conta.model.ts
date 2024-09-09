import { Transacao } from '../transacao/transacao.model';
import { TipoConta } from './TipoConta';
export abstract class Conta {
  transacoes: Transacao[] = [];
  id: string;

  constructor(
    public saldo: number,
    public clienteId: string,
    public tipo: TipoConta,
  ) {}

  abstract sacar(valor: number): void;
}
