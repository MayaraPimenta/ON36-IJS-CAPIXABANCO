import { ConfigService } from '@nestjs/config';
import { Conta } from '../infrastructure/entities/conta.entity';
import { DataSource } from 'typeorm';
import { Transacao } from 'src/infrastructure/entities/transacao.entity';
import { Cliente } from 'src/infrastructure/entities/cliente.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Conta, Cliente, Transacao],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false, // Isso é importante se você estiver se conectando ao Supabase
        },
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
