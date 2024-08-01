import { Module } from '@nestjs/common';
import { GerenteController } from './gerente.controller';
import { GerenteService } from './gerente.service';
import { ContaService } from 'src/conta/conta.service';
import { ContaFactory } from 'src/conta/factories/ContaFactory';

@Module({
  controllers: [GerenteController],
  providers: [GerenteService, ContaService, ContaFactory],
})
export class GerenteModule {}
