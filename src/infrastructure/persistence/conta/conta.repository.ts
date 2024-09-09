import { Conta } from '../../../domain/conta/conta.model';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TipoConta } from 'src/domain/conta/TipoConta';
import { QueryFailedError, Repository } from 'typeorm';
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
    try {
      const cliente = await this.contaRepository.findOneBy({
        id: conta.clienteId,
      });
      if (!cliente) {
        throw new NotFoundException('Cliente não encontrado');
      }

      const novaConta = await this.contaRepository.save(conta);
      return novaConta;
    } catch (error) {
      throw error;
    }
  }

  async updateTipoConta(id: string, tipo: TipoConta): Promise<Conta> {
    try {
      const conta = await this.contaRepository.findOneBy({ id: id });
      if (!conta) {
        throw new NotFoundException('Conta não encontrada');
      }

      conta.tipo = tipo;
      await this.contaRepository.save(conta);

      return conta;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException('Formato de ID inválido');
      }
      throw error;
    }
  }

  async remover(id: string): Promise<void> {
    const conta = await this.contaRepository.findOneBy({ id: id });
    await this.contaRepository.remove(conta);
  }

  async getContas(): Promise<Conta[]> {
    const contas = await this.contaRepository.find();
    return contas;
  }

  async getConta(id): Promise<Conta> {
    const conta = await this.contaRepository.findOneBy({ id: id });
    return conta;
  }
}
