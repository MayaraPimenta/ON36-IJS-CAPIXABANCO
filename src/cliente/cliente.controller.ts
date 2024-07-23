import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { Conta, TipoConta } from 'src/conta/conta.model';
import { ContaService } from 'src/conta/conta.service';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly contaService: ContaService) {}

  @Post('conta')
  criarConta(
    @Body('saldo') saldo: number,
    @Body('clienteId') clienteId: number,
    @Body('tipo') tipo: TipoConta,
  ): Conta {
    return this.contaService.criarConta(saldo, clienteId, tipo);
  }

  @Patch('conta/:id')
  modificarTipoConta(
    @Param('id') id: number,
    @Body('tipo') novoTipo: TipoConta,
  ): Conta {
    return this.contaService.modificarTipoConta(id, novoTipo);
  }

  @Delete('conta/:id')
  removerConta(@Param('id') id: number): void {
    this.contaService.removerConta(id);
  }
}
