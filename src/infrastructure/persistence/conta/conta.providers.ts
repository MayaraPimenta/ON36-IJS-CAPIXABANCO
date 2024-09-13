import { DataSource } from 'typeorm';
import { Conta } from 'src/infrastructure/entities/conta.entity';

export const contaProviders = [
  {
    provide: 'CONTA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Conta),
    inject: ['DATA_SOURCE'],
  },
];

//In the real-world applications you should avoid magic strings. Both CONTA_REPOSITORY and DATA_SOURCE should be kept in the separated constants.ts file.
