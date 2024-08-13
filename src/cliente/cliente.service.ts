import { Injectable, NotFoundException } from '@nestjs/common';
import { Cliente } from './models/cliente.model';
import { ClienteRepository } from './cliente.repository';
import { TextResponse } from '../types/global';

@Injectable()
export class ClienteService {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  criarCliente(nome: string, endereco: string, telefone: string): Cliente {
    const clientes = this.clienteRepository.lerClientes();
    const clienteId =
      clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1;
    const novoCliente = new Cliente(nome, clienteId, endereco, telefone);

    clientes.push(novoCliente);
    this.clienteRepository.escreverClientes(clientes);
    return novoCliente;
  }

  removerCliente(id: number): TextResponse {
    const clientes = this.clienteRepository.lerClientes();
    const clienteIndex = clientes.findIndex((conta) => conta.id === Number(id));

    if (clienteIndex === -1) {
      throw new NotFoundException('Conta não encontrada!');
    }

    clientes.splice(clienteIndex, 1);
    this.clienteRepository.escreverClientes(clientes);

    const clienteEncontrado = clientes.find((cliente) => cliente.id === id);
    if (!clienteEncontrado) {
      return { message: 'Cliente deletado com sucesso!' };
    }
    throw new Error('Algo deu errado, cliente não removido.');
  }
}
