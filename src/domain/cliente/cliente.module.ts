import { Module } from '@nestjs/common';
import { ClienteService } from '../../application/cliente.service';
import { ContaService } from '../../application/conta.service';
import { ClienteController } from '../../adapters/inbound/cliente.controller';
import { ContaFactory } from '../conta/ContaFactory';
import { ClienteRepository } from '../../adapters/outbound/cliente.repository';
import { ContaRepository } from '../../adapters/outbound/conta.repository';

@Module({
  providers: [
    ClienteService,
    ContaService,
    ContaFactory,
    ClienteRepository,
    ContaRepository,
  ],
  controllers: [ClienteController],
  exports: [ClienteRepository],
})
export class ClienteModule {}
