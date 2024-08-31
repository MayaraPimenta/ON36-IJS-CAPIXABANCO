import { Conta } from '../../../domain/conta/conta.model';
import { Inject, Injectable } from '@nestjs/common';
import { TipoConta } from 'src/domain/conta/TipoConta';
import { Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ContaRepository extends Repository<Conta> {
  constructor(
    @Inject('CONTA_REPOSITORY')
    private contaRepository: Repository<Conta>,
  ) {
    super(
      contaRepository.target,
      contaRepository.manager,
      contaRepository.queryRunner,
    );
  }

  // remover - start
  readonly filePath = path.resolve('src/data/contas.json');
  lerContas(): Conta[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Conta[];
  }
  escreverContas(contas: Conta[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(contas, null, 2), 'utf8');
  }
  // remover - end

  async salvar(conta: Conta): Promise<Conta> {
    await this.contaRepository.save(conta);

    return conta;
  }

  async modificarTipoConta(id: string, tipo: TipoConta): Promise<Conta> {
    const conta = await this.contaRepository.findOneBy({ id: id });
    conta.tipo = tipo;
    await this.contaRepository.save(conta);

    return conta;
  }

  async remover(id: string): Promise<void> {
    const conta = await this.contaRepository.findOneBy({ id: id });
    await this.contaRepository.remove(conta);
  }
}
