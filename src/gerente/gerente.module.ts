import { Module } from '@nestjs/common';
import { GerenteController } from './gerente.controller';
import { GerenteService } from './gerente.service';
import { ContaService } from 'src/conta/conta.service';

@Module({
  controllers: [GerenteController],
  providers: [GerenteService, ContaService],
})
export class GerenteModule {}
