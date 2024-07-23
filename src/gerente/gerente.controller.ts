import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { Cliente } from 'src/cliente/cliente.model';
import { Conta, TipoConta } from 'src/conta/conta.model';
import { ContaService } from 'src/conta/conta.service';
import { GerenteService } from 'src/gerente/gerente.service';

@Controller('gerente')
export class GerenteController {
  constructor(
    private readonly contaService: ContaService,
    private readonly gerenteService: GerenteService,
  ) {}

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

  @Post('cliente')
  criarCliente(
    @Body('nome') nome: string,
    @Body('id') id: number,
    @Body('endereco') endereco: string,
    @Body('telefone') telefone: string,
    @Body('gerente') gerenteId: number,
  ): Cliente {
    return this.gerenteService.criarCliente(
      nome,
      id,
      endereco,
      telefone,
      gerenteId,
    );
  }

  @Delete('cliente/:id')
  removerCliente(@Param('id') id: number): void {
    this.gerenteService.removerCliente(id);
  }
}
