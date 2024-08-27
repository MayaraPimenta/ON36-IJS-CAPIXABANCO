import { Module } from '@nestjs/common';
import { GerenteController } from '../../adapters/inbound/gerente.controller';
import { GerenteService } from '../../application/gerente.service';

@Module({
  controllers: [GerenteController],
  providers: [GerenteService],
})
export class GerenteModule {}
