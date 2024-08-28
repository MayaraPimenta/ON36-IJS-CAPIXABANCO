import * as path from 'path';
import * as fs from 'fs';
import { Transacao } from '../../domain/transacao/transacao.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransacaoRepository {
  readonly transacaoPath = path.resolve('src/data/transacoes.json');

  lerTransacoes(): Transacao[] {
    const data = fs.readFileSync(this.transacaoPath, 'utf8');
    return JSON.parse(data) as Transacao[];
  }

  escreverTransacoes(transacoes: Transacao[]): void {
    fs.writeFileSync(
      this.transacaoPath,
      JSON.stringify(transacoes, null, 2),
      'utf8',
    );
  }
}
