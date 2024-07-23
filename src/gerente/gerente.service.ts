import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Cliente } from 'src/cliente/cliente.model';

@Injectable()
export class GerenteService {
  private readonly filePath = path.resolve('src/cliente/clientes.json');

  private lerClientes(): Cliente[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Cliente[];
  }

  private escreverClientes(accounts: Cliente[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf8');
  }

  criarCliente(
    nome: string,
    id: number,
    endereco: string,
    telefone: string,
    gerenteId: number,
  ): Cliente {
    const clientes = this.lerClientes();
    const novoCliente = new Cliente(nome, id, endereco, telefone, gerenteId);

    clientes.push(novoCliente);
    this.escreverClientes(clientes);
    return novoCliente;
  }

  removerCliente(id: number): void {
    const clientes = this.lerClientes();
    const clienteIndex = clientes.findIndex((conta) => conta.id === Number(id));
    clientes.splice(clienteIndex, 1);
    this.escreverClientes(clientes);
  }
}
