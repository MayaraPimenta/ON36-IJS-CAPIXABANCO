import { Controller, Post, Param, Body, Delete, Patch } from '@nestjs/common';
import { ContaService } from '../../application/conta.service';
import { Conta } from '../../domain/conta/conta.model';
import { CriarContaDto } from '../dto/conta/criar-conta-dto/criar-conta-dto';
import { UpdateContaDto } from '../dto/conta/update-conta-dto/update-conta-dto';

@Controller('conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Post('criar')
  criarConta(@Body() criarContaDto: CriarContaDto): Promise<Conta> {
    return this.contaService.criar(criarContaDto);
  }

  @Patch(':id')
  modificarTipoConta(@Body() updateContaDto: UpdateContaDto): Promise<Conta> {
    return this.contaService.updateTipoConta(updateContaDto);
  }

  @Delete(':id')
  removerConta(@Param('id') id: string): void {
    this.contaService.removerConta(id);
  }
}
