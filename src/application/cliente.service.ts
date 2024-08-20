import { Injectable } from '@nestjs/common';
import { Cliente } from '../domain/cliente/cliente.model';
import { ClienteRepository } from '../adapters/outbound/cliente.repository';
import { TextResponse } from '../types/global';
import { ViaCepApi } from '../adapters/outbound/viaCep.api';
import { CepAdapter } from '../domain/cep/outbound/cep.adapter';

@Injectable()
export class ClienteService {
  constructor(
    private readonly clienteRepository: ClienteRepository,
    private readonly viaCepApi: ViaCepApi,
    private readonly cepAdapter: CepAdapter,
  ) {}

  async criarCliente(
    nome: string,
    cep: string,
    telefone: string,
  ): Promise<Cliente> {
    const viaCep = await this.viaCepApi.buscarEndereco(cep);
    const endereco = this.cepAdapter.adaptaCep(viaCep);

    return this.clienteRepository.criarCliente(nome, endereco, telefone);
  }

  removerCliente(id: number): TextResponse {
    return this.clienteRepository.removerCliente(id);
  }
}
