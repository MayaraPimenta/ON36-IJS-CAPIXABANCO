import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ClienteService } from '../../application/cliente.service';
import { Cliente } from '../../domain/cliente/cliente.model';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('criar')
  criar(
    @Body('nome') nome: string,
    @Body('cep') cep: string,
    @Body('telefone') telefone: string,
  ): Promise<Cliente> {
    return this.clienteService.criar(nome, cep, telefone);
  }

  @Delete(':id')
  removerCliente(@Param('id') id: string): void {
    this.clienteService.removerCliente(id);
  }
}
