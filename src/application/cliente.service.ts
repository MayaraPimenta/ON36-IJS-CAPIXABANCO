import { Injectable } from '@nestjs/common';
import { Cliente } from '../domain/cliente/cliente.model';
import { ClienteRepository } from '../adapters/outbound/cliente.repository';
import { TextResponse } from '../types/global';

@Injectable()
export class ClienteService {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  criarCliente(nome: string, endereco: string, telefone: string): Cliente {
    return this.clienteRepository.criarCliente(nome, endereco, telefone);
  }

  removerCliente(id: number): TextResponse {
    return this.clienteRepository.removerCliente(id);
  }
}
