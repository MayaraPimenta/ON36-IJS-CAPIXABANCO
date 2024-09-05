import { Cliente } from '../../../domain/cliente/cliente.model';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteRepository extends Repository<Cliente> {
  constructor(
    @Inject('CLIENTE_REPOSITORY')
    private clienteRepository: Repository<Cliente>,
  ) {
    super(
      clienteRepository.target,
      clienteRepository.manager,
      clienteRepository.queryRunner,
    );
  }

  async getCliente(id: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOneBy({ id: id });

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return cliente;
  }

  async salvar(cliente): Promise<Cliente> {
    const novoCliente = await this.clienteRepository.save(cliente);

    return novoCliente;
  }

  async removerCliente(id: string): Promise<void> {
    const conta = await this.clienteRepository.findOneBy({ id: id });
    await this.clienteRepository.remove(conta);
  }
}
