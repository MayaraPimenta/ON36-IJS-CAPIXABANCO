import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ContaService } from '../conta/conta.service';
import { ClienteController } from './cliente.controller';
import { ContaFactory } from 'src/conta/factories/ContaFactory';

@Module({
  providers: [ClienteService, ContaService, ContaFactory],
  controllers: [ClienteController],
})
export class ClienteModule {}
