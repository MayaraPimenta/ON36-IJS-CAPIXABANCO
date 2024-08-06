import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GerenteModule } from './gerente/gerente.module';
import { ContaModule } from './conta/conta.module';
import { ClienteModule } from './cliente/cliente.module';
import { TransacaoModule } from './transacao/transacao.module';

@Module({
  imports: [GerenteModule, ContaModule, ClienteModule, TransacaoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
