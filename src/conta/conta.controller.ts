import { Controller, Post, Param, Body } from '@nestjs/common';
import { ContaService } from './conta.service';
import { Transacao } from 'src/transacao/models/transacao.model';

@Controller('conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Post('depositar/:id')
  depositar(@Body('valor') valor: number, @Param('id') id: number): Transacao {
    return this.contaService.depositar(valor, id);
  }
}
