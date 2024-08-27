import { Module } from '@nestjs/common';
import { TransacaoService } from '../../application/transacao.service';
import { TransacaoController } from '../../adapters/inbound/transacao.controller';
import { ContaRepository } from '../../adapters/outbound/conta.repository';
import { TransacaoRepository } from '../../adapters/outbound/transacao.repository';
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
