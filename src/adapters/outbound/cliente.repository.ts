import * as path from 'path';
import * as fs from 'fs';
import { Cliente } from '../../domain/cliente/cliente.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TextResponse } from '../../types/global';

@Injectable()
export class ClienteRepository {
  public readonly filePath = path.resolve('src/data/clientes.json');

  public lerClientes(): Cliente[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Cliente[];
  }

  public escreverClientes(clientes: Cliente[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(clientes, null, 2), 'utf8');
  }

  public criarCliente(
    nome: string,
    endereco: string,
    telefone: string,
  ): Cliente {
    const clientes = this.lerClientes();
    const clienteId =
      clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1;
    const novoCliente = new Cliente(nome, clienteId, endereco, telefone);

    clientes.push(novoCliente);
    this.escreverClientes(clientes);
    return novoCliente;
  }

  public removerCliente(id: number): TextResponse {
    const clientes = this.lerClientes();
    const clienteIndex = clientes.findIndex((conta) => conta.id === Number(id));

    if (clienteIndex === -1) {
      throw new NotFoundException('Conta não encontrada!');
    }

    clientes.splice(clienteIndex, 1);
    this.escreverClientes(clientes);

    const clienteEncontrado = clientes.find((cliente) => cliente.id === id);
    if (!clienteEncontrado) {
      return { message: 'Cliente deletado com sucesso!' };
    }
    throw new Error('Algo deu errado, cliente não removido.');
  }

  public getClienteById(id: number): Cliente {
    const clientes = this.lerClientes();
    const cliente = clientes.find((cliente) => cliente.id === id);

    return cliente;
  }
}
