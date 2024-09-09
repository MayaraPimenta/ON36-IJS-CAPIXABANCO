import { ContaCorrente } from '../contaCorrente.model';
import { TransacaoStrategy } from './TransacaoStrategy';

export class ContaCorrenteStrategy extends TransacaoStrategy {
  sacar(conta: ContaCorrente, valor: number): void {
    return conta.sacar(valor);
  }
}
