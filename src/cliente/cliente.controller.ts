import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ClienteService } from 'src/cliente/cliente.service';
import { Cliente } from './models/cliente.model';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('criar')
  criarCliente(
    @Body('nome') nome: string,
    @Body('endereco') endereco: string,
    @Body('telefone') telefone: string,
  ): Cliente {
    return this.clienteService.criarCliente(nome, endereco, telefone);
  }

  @Delete(':id')
  removerCliente(@Param('id') id: number): void {
    this.clienteService.removerCliente(id);
  }
}
