import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ViaCepApi } from 'src/adapters/outbound/viaCep.api';

@Module({
  imports: [HttpModule],
  providers: [ViaCepApi],
  exports: [ViaCepApi],
})
export class CepModule {}
