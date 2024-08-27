import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ViaCepApi {
  constructor(private readonly httpService: HttpService) {}

  async buscarEndereco(cep: string): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get(`https://viacep.com.br/ws/${cep}/json/`),
    );

    return response.data;
  }
}
