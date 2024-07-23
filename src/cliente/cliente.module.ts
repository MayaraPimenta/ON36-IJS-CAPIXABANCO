import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ContaService } from '../conta/conta.service';
import { ClienteController } from './cliente.controller';

@Module({
  providers: [ClienteService, ContaService],
  controllers: [ClienteController],
})
export class ClienteModule {}
