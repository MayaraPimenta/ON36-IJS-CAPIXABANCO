import { ContaFactory } from '../factories/ContaFactory';
import { TipoConta } from '../enum/TipoConta';

describe('ContaFactory', () => {
  test('deve criar uma conta corrente', () => {
    const contaFactory = new ContaFactory();
    const response = contaFactory.criarConta(1, 0, 1, TipoConta.CORRENTE);

    expect(response.saldo).toBe(0);
    expect(response.tipo).toBe('corrente');
    expect(response.id).toEqual(1);
  });

  test('deve criar uma conta poupanca', () => {
    const contaFactory = new ContaFactory();
    const response = contaFactory.criarConta(1, 0, 1, TipoConta.POUPANCA);

    expect(response.saldo).toBe(0);
    expect(response.tipo).toBe('poupanca');
    expect(response.id).toEqual(1);
  });
});
