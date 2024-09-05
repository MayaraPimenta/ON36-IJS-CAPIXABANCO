import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { TipoConta } from 'src/domain/conta/TipoConta';

export class CriarContaDto {
  @IsNumber()
  saldo: number;

  @IsUUID()
  clienteId: string;

  @IsString()
  @IsEnum(TipoConta)
  tipo: TipoConta;
}
