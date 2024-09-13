import { Injectable } from '@nestjs/common';
import { Cliente } from '../domain/cliente/cliente.model';
import { ClienteRepository } from '../infrastructure/persistence/cliente/cliente.repository';
import { ViaCepApi } from '../infrastructure/api/viaCep.api';
import { CepAdapter } from './cep.adapter';

@Injectable()
export class ClienteService {
  constructor(
    private readonly clienteRepository: ClienteRepository,
    private readonly viaCepApi: ViaCepApi,
    private readonly cepAdapter: CepAdapter,
  ) {}

  async criar(criarClienteDto): Promise<Cliente> {
    const viaCep = await this.viaCepApi.buscarEndereco(criarClienteDto.cep);
    const endereco = this.cepAdapter.adaptaCep(viaCep);
    //transformar chamada a cep em interceptor

    const cliente = new Cliente(
      criarClienteDto.nome,
      endereco,
      criarClienteDto.telefone,
    );
    return this.clienteRepository.salvar(cliente);
  }

  removerCliente(id: string): void {
    this.clienteRepository.removerCliente(id);
  }
}
