import { Module } from '@nestjs/common';
import { ClienteService } from '../../application/cliente.service';
import { ContaService } from '../../application/conta.service';
import { ClienteController } from '../../presenter/http/cliente.controller';
import { ContaFactory } from '../conta/ContaFactory';
import { ClienteRepository } from '../../infrastructure/persistence/cliente.repository';
import { ContaRepository } from '../../infrastructure/persistence/conta.repository';
import { HttpModule } from '@nestjs/axios';
import { CepModule } from '../cep/cep.module';
import { CepAdapter } from '../../application/cep.adapter';

@Module({
  imports: [HttpModule, CepModule],
  providers: [
    ClienteService,
    ContaService,
    ContaFactory,
    ClienteRepository,
    ContaRepository,
    CepAdapter,
  ],
  controllers: [ClienteController],
  exports: [ClienteRepository],
})
export class ClienteModule {}
