import { Body, Controller, Param, Patch } from '@nestjs/common';
import { TransacaoService } from '../../application/transacao.service';
import { Transacao } from '../../domain/transacao/transacao.model';

@Controller('transacao')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @Patch('depositar/:id')
  depositar(@Body('valor') valor: number, @Param('id') id: string): Transacao {
    return this.transacaoService.depositar(valor, id);
  }

  @Patch('sacar/:id')
  sacar(@Body('valor') valor: number, @Param('id') id: string): Transacao {
    return this.transacaoService.sacar(valor, id);
  }

  @Patch('transferir/:contaId')
  transferir(
    @Body('valor') valor: number,
    @Param('contaId') contaId: string,
    @Body('contaDestinoId') contaDestinoId: string,
  ): Transacao {
    return this.transacaoService.transferir(valor, contaId, contaDestinoId);
  }
}
