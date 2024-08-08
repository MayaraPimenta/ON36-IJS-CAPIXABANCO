import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { TransacaoController } from './transacao.controller';
import { ContaRepository } from '../conta/conta.repository';
import { TransacaoRepository } from './transacao.repository';

@Module({
  providers: [TransacaoService, ContaRepository, TransacaoRepository],
  controllers: [TransacaoController],
})
export class TransacaoModule {}
