import { Module } from '@nestjs/common';
import { TransacaoService } from '../../application/transacao.service';
import { TransacaoController } from '../../presenter/http/transacao.controller';
import { ContaRepository } from '../../infrastructure/persistence/conta.repository';
import { TransacaoRepository } from '../../infrastructure/persistence/transacao.repository';
import { ContaFactory } from '../conta/ContaFactory';

@Module({
  providers: [
    TransacaoService,
    ContaRepository,
    TransacaoRepository,
    ContaFactory,
  ],
  controllers: [TransacaoController],
})
export class TransacaoModule {}
