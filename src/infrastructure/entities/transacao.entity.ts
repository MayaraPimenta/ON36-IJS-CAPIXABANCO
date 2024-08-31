import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Conta } from './conta.entity';
import { TipoTransacao } from 'src/domain/transacao/transacao.model';

@Entity('transacao')
export class Transacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  valor: number;

  @Column('date')
  dateTime: Date;

  @Column({
    type: 'enum',
    enum: TipoTransacao,
    default: 1,
  })
  tipo: TipoTransacao;

  @ManyToOne(() => Conta, (conta) => conta.transacoes)
  conta: Conta;
}
