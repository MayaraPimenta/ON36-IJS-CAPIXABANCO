import { Module } from '@nestjs/common';
import { TransacaoService } from '../../application/transacao.service';
import { TransacaoController } from '../../presenter/http/transacao.controller';
import { ContaRepository } from '../../infrastructure/persistence/conta/conta.repository';
import { TransacaoRepository } from '../../infrastructure/persistence/transacao.repository';
import { ContaFactory } from '../conta/ContaFactory';
import { contaProviders } from 'src/infrastructure/persistence/conta/conta.providers';
import { databaseProviders } from 'src/db/db.providers';

@Module({
  providers: [
    TransacaoService,
    ContaRepository,
    TransacaoRepository,
    ContaFactory,
    ...contaProviders,
    ...databaseProviders,
  ],
  controllers: [TransacaoController],
})
export class TransacaoModule {}
