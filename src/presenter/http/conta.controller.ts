import { Controller, Post, Param, Body, Delete, Patch } from '@nestjs/common';
import { ContaService } from '../../application/conta.service';
import { Conta } from '../../domain/conta/conta.model';
import { TipoConta } from '../../domain/conta/TipoConta';

@Controller('conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Post('criar')
  criarConta(
    @Body('saldo') saldo: number,
    @Body('clienteId') clienteId: string,
    @Body('tipo') tipo: TipoConta,
  ): Promise<Conta> {
    return this.contaService.criarConta(saldo, clienteId, tipo);
  }

  @Patch(':id')
  modificarTipoConta(
    @Param('id') id: string,
    @Body('tipo') novoTipo: TipoConta,
  ): Promise<Conta> {
    return this.contaService.modificarTipoConta(id, novoTipo);
  }

  @Delete(':id')
  removerConta(@Param('id') id: string): void {
    this.contaService.removerConta(id);
  }
}
