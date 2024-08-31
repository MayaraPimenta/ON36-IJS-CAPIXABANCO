import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Conta } from './conta.entity';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  nome: string;

  @Column('text')
  endereco: string;

  @Column('text')
  telefone: string;

  @OneToMany(() => Conta, (conta) => conta.cliente)
  contas: Conta[];
}
