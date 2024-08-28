import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ClienteService } from '../../application/cliente.service';
import { Cliente } from '../../domain/cliente/cliente.model';
import { TextResponse } from '../../types/global';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('criar')
  criarCliente(
    @Body('nome') nome: string,
    @Body('cep') cep: string,
    @Body('telefone') telefone: string,
  ): Promise<Cliente> {
    return this.clienteService.criarCliente(nome, cep, telefone);
  }

  @Delete(':id')
  removerCliente(@Param('id') id: number): TextResponse {
    return this.clienteService.removerCliente(id);
  }
}
