import * as path from 'path';
import * as fs from 'fs';
import { Conta } from './models/conta.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContaRepository {
  readonly filePath = path.resolve('src/conta/data/contas.json');

  lerContas(): Conta[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Conta[];
  }

  escreverContas(contas: Conta[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(contas, null, 2), 'utf8');
  }
}
