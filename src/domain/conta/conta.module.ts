import { Module } from '@nestjs/common';
import { ContaController } from '../../presenter/http/conta.controller';
import { ContaService } from '../../application/conta.service';
import { ContaFactory } from './ContaFactory';
import { Transacao } from '../transacao/transacao.model';
import { Conta } from './conta.model';
import { ContaRepository } from '../../infrastructure/persistence/conta/conta.repository';
import { ClienteRepository } from '../../infrastructure/persistence/cliente/cliente.repository';
import { contaProviders } from 'src/infrastructure/persistence/conta/conta.providers';
import { databaseProviders } from 'src/db/db.providers';
import { clienteProviders } from 'src/infrastructure/persistence/cliente/cliente.providers';

@Module({
  controllers: [ContaController],
  providers: [
    ContaService,
    ContaFactory,
    Transacao,
    Conta,
    ClienteRepository,
    ContaRepository,
    ...contaProviders,
    ...clienteProviders,
    ...databaseProviders,
  ],
  exports: [ContaRepository],
})
export class ContaModule {}
