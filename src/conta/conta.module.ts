import { Module } from '@nestjs/common';
import { ContaController } from './conta.controller';
import { ContaService } from './conta.service';
import { ContaFactory } from './factories/ContaFactory';
import { Transacao } from 'src/transacao/models/transacao.model';
import { Conta } from 'src/conta/models/conta.model';

@Module({
  controllers: [ContaController],
  providers: [ContaService, ContaFactory, Transacao, Conta],
})
export class ContaModule {}
