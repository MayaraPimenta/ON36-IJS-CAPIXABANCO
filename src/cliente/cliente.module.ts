import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ContaService } from '../conta/conta.service';
import { ClienteController } from './cliente.controller';
import { ContaFactory } from '../conta/factories/ContaFactory';
import { ClienteRepository } from './cliente.repository';
import { ContaRepository } from '../conta/conta.repository';

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
