import { Conta } from '../conta.model';

export abstract class TransacaoStrategy {
  abstract sacar(conta: Conta, valor: number): void;
}
