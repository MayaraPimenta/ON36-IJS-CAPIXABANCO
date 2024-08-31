import { Controller, Post, Param, Body, Delete, Patch } from '@nestjs/common';
import { ContaService } from '../../application/conta.service';
import { Conta } from '../../domain/conta/conta.model';
import { TipoConta } from '../../domain/conta/TipoConta';
import { TextResponse } from 'src/types/global';

@Controller('conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Post('criar')
  criarConta(
    @Body('saldo') saldo: number,
    @Body('clienteId') clienteId: number,
    @Body('tipo') tipo: TipoConta,
  ): void {
    this.contaService.criarConta(saldo, clienteId, tipo);
  }

  @Patch(':id')
  modificarTipoConta(
    @Param('id') id: number,
    @Body('tipo') novoTipo: TipoConta,
  ): Conta {
    return this.contaService.modificarTipoConta(id, novoTipo);
  }

  @Delete(':id')
  removerConta(@Param('id') id: number): TextResponse {
    return this.contaService.removerConta(id);
  }
}
