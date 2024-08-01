import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { TransacaoController } from './transacao.controller';

@Module({
  providers: [TransacaoService],
  controllers: [TransacaoController]
})
export class TransacaoModule {}
