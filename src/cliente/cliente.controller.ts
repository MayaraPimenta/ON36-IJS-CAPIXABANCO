import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ClienteService } from '../cliente/cliente.service';
import { Cliente } from './models/cliente.model';
import { TextResponse } from '../types/global';

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
  removerCliente(@Param('id') id: number): TextResponse {
    return this.clienteService.removerCliente(id);
  }
}
