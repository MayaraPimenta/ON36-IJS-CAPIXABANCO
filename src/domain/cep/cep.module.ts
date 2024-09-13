import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ViaCepApi } from 'src/infrastructure/api/viaCep.api';

@Module({
  imports: [HttpModule],
  providers: [ViaCepApi],
  exports: [ViaCepApi],
})
export class CepModule {}
