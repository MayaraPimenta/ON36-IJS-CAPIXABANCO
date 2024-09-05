import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ClienteService } from '../../application/cliente.service';
import { Cliente } from '../../domain/cliente/cliente.model';
import { CriarClienteDto } from '../dto/cliente/criar-cliente-dto/criar-cliente-dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('criar')
  async criar(@Body() criarClienteDto: CriarClienteDto): Promise<Cliente> {
    return this.clienteService.criar(criarClienteDto);
  }

  @Delete(':id')
  removerCliente(@Param('id') id: string): void {
    this.clienteService.removerCliente(id);
  }
}
