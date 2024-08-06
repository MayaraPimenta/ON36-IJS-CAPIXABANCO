import { Controller, Post, Param, Body, Delete, Patch } from '@nestjs/common';
import { ContaService } from './conta.service';
import { Conta } from './models/conta.model';
import { TipoConta } from './enum/TipoConta';

@Controller('conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Post('criar')
  criarConta(
    @Body('saldo') saldo: number,
    @Body('clienteId') clienteId: number,
    @Body('tipo') tipo: TipoConta,
  ): Conta {
    return this.contaService.criarConta(saldo, clienteId, tipo);
  }

  @Patch(':id')
  modificarTipoConta(
    @Param('id') id: number,
    @Body('tipo') novoTipo: TipoConta,
  ): Conta {
    return this.contaService.modificarTipoConta(id, novoTipo);
  }

  @Delete(':id')
  removerConta(@Param('id') id: number): void {
    this.contaService.removerConta(id);
  }
}
