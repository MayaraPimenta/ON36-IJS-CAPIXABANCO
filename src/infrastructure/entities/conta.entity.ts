import { TipoConta } from 'src/domain/conta/TipoConta';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Transacao } from './transacao.entity';
import { Cliente } from './cliente.entity';

@Entity('conta')
export class Conta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  saldo: number;

  @Column({
    type: 'enum',
    enum: TipoConta,
    default: 'corrente',
  })
  tipo: TipoConta;

  @OneToMany(() => Transacao, (transacao) => transacao.conta)
  transacoes: Transacao[];

  @ManyToOne(() => Cliente, (cliente) => cliente.contas)
  cliente: Cliente;
}
