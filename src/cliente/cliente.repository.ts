import * as path from 'path';
import * as fs from 'fs';
import { Cliente } from './models/cliente.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClienteRepository {
  public readonly filePath = path.resolve('src/cliente/data/clientes.json');

  public lerClientes(): Cliente[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Cliente[];
  }
  public escreverClientes(clientes: Cliente[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(clientes, null, 2), 'utf8');
  }
}
