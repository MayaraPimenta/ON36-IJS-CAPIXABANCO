import { Body, Controller, Param, Patch } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { Transacao } from './models/transacao.model';

@Controller('transacao')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @Patch('depositar/:id')
  depositar(@Body('valor') valor: number, @Param('id') id: number): Transacao {
    return this.transacaoService.depositar(valor, id);
  }

  @Patch('sacar/:id')
  sacar(@Body('valor') valor: number, @Param('id') id: number): Transacao {
    return this.transacaoService.sacar(valor, id);
  }

  @Patch('transferir/:contaId')
  transferir(
    @Body('valor') valor: number,
    @Param('contaId') contaId: number,
    @Body('contaDestinoId') contaDestinoId: number,
  ): Transacao {
    return this.transacaoService.transferir(valor, contaId, contaDestinoId);
  }
}
