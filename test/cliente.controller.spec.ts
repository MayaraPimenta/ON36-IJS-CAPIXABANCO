import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { ClienteRepository } from '../cliente.repository';

describe('Client Controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test('Deve criar um cliente', () => {
    return request(app.getHttpServer())
      .post('/cliente/criar')
      .send({
        nome: 'Cliente 1',
        endereco: 'Rua X, N1',
        telefone: '999899897',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.nome).toBe('Cliente 1');
        expect(body.endereco).toBe('Rua X, N1');
        expect(body.telefone).toBe('999899897');
      });
  });

  test('Deve remover um cliente', () => {
    const clienteRepository = new ClienteRepository();
    const clientes = clienteRepository.lerClientes();
    const clienteId = clientes[clientes.length - 1].id;

    return request(app.getHttpServer())
      .delete(`/cliente/${clienteId}`)
      .expect(200)
      .expect({ message: 'Cliente deletado com sucesso!' });
  });

  test('Deve retornar um erro ao tentar deletar cliente não existente', () => {
    return request(app.getHttpServer())
      .delete('/cliente/123')
      .send('123')
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Conta não encontrada!',
        error: 'Not Found',
      });
  });
});
