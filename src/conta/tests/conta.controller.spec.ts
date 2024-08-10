import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import * as request from 'supertest';
import { TipoConta } from '../enum/TipoConta';

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
});
