import { ContaFactory } from '../factories/ContaFactory';
import { TipoConta } from '../enum/TipoConta';

describe('ContaFactory', () => {
  test('should create a conta corrente', () => {
    const contaFactory = new ContaFactory();
    const response = contaFactory.criarConta(1, 0, 1, TipoConta.CORRENTE);

    expect(response.saldo).toBe(0);
    expect(response.tipo).toBe('corrente');
    expect(response.id).toEqual(1);
  });

  // test('should create a conta poupanca', () => {
  // });

  // test('should return an exceptopn when type is invalid', () => {
  // });
});
