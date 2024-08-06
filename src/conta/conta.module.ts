import { Module } from '@nestjs/common';
import { ContaController } from './conta.controller';
import { ContaService } from './conta.service';
import { ContaFactory } from './factories/ContaFactory';
import { Transacao } from 'src/transacao/models/transacao.model';
import { Conta } from 'src/conta/models/conta.model';
import { ContaRepository } from './conta.repository';
import { ClienteRepository } from 'src/cliente/cliente.repository';

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
