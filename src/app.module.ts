import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GerenteModule } from './domain/gerente/gerente.module';
import { ContaModule } from './domain/conta/conta.module';
import { ClienteModule } from './domain/cliente/cliente.module';
import { TransacaoModule } from './domain/transacao/transacao.module';
import { HttpModule } from '@nestjs/axios';
import { CepModule } from './domain/cep/cep.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigService disponível globalmente
    }),
    GerenteModule,
    ContaModule,
    ClienteModule,
    TransacaoModule,
    HttpModule,
    CepModule,
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
