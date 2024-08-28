import { Module } from '@nestjs/common';
import { ContaController } from '../../presenter/http/conta.controller';
import { ContaService } from '../../application/conta.service';
import { ContaFactory } from './ContaFactory';
import { Transacao } from '../transacao/transacao.model';
import { Conta } from './conta.model';
import { ContaRepository } from '../../infrastructure/persistence/conta.repository';
import { ClienteRepository } from '../../infrastructure/persistence/cliente.repository';

@Module({
  controllers: [ContaController],
  providers: [
    ContaService,
    ContaFactory,
    Transacao,
    Conta,
    ClienteRepository,
    ContaRepository,
  ],
  exports: [ContaRepository],
})
export class ContaModule {}
