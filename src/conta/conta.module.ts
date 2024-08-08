import { Module } from '@nestjs/common';
import { ContaController } from './conta.controller';
import { ContaService } from './conta.service';
import { ContaFactory } from './factories/ContaFactory';
import { Transacao } from '../transacao/models/transacao.model';
import { Conta } from '../conta/models/conta.model';
import { ContaRepository } from './conta.repository';
import { ClienteRepository } from '../cliente/cliente.repository';

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
