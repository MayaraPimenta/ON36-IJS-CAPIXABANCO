import { ContaPoupanca } from '../contaPoupanca.model';
import { TransacaoStrategy } from './TransacaoStrategy';

export class ContaPoupancaStrategy extends TransacaoStrategy {
  sacar(conta: ContaPoupanca, valor: number): void {
    return conta.sacar(valor);
  }
}
