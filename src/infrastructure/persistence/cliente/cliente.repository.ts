import { Cliente } from '../../../domain/cliente/cliente.model';
import { Inject, Injectable } from '@nestjs/common';
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
    return cliente;
  }

  async salvar(cliente): Promise<Cliente> {
    await this.clienteRepository.save(cliente);

    return cliente;
  }

  async removerCliente(id: string): Promise<void> {
    const conta = await this.clienteRepository.findOneBy({ id: id });
    await this.clienteRepository.remove(conta);
  }
}
