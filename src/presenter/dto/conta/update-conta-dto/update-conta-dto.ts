import { IsEnum, IsString, IsUUID } from 'class-validator';
import { TipoConta } from 'src/domain/conta/TipoConta';

export class UpdateContaDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsEnum(TipoConta)
  tipo: TipoConta;
}
