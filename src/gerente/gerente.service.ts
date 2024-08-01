import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Cliente } from 'src/cliente/models/cliente.model';

@Injectable()
export class GerenteService {
  private readonly filePath = path.resolve('src/cliente/data/clientes.json');
  private lerClientes(): Cliente[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Cliente[];
  }
  private escreverClientes(clientes: Cliente[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(clientes, null, 2), 'utf8');
  }

  criarCliente(nome: string, endereco: string, telefone: string): Cliente {
    const clientes = this.lerClientes();
    const clienteId =
      clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1;
    const novoCliente = new Cliente(nome, clienteId, endereco, telefone);

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
