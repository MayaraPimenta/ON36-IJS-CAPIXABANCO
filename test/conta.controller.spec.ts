import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { TipoConta } from '../src/domain/conta/TipoConta';
import { ContaRepository } from '../src/adapters/outbound/conta.repository';

describe('Client Controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test('Deve criar uma conta', () => {
    return request(app.getHttpServer())
      .post('/conta/criar')
      .send({
        saldo: 100,
        clienteId: 1,
        tipo: TipoConta.CORRENTE,
      })
      .expect(201);
  });

  test('Deve modificar uma conta', () => {
    const contaRepository = new ContaRepository();
    const contas = contaRepository.lerContas();
    const clienteId = contas[contas.length - 1].id;

    return request(app.getHttpServer())
      .patch(`/conta/${clienteId}`)
      .send({
        id: clienteId,
        tipo: TipoConta.POUPANCA,
      })
      .expect(200);
  });

  test('Deve remover uma conta', () => {
    const contaRepository = new ContaRepository();
    const contas = contaRepository.lerContas();
    const clienteId = contas[contas.length - 1].id;

    return request(app.getHttpServer())
      .delete(`/conta/${clienteId}`)
      .expect(200)
      .expect({ message: 'Conta deletada com sucesso!' });
  });
});
