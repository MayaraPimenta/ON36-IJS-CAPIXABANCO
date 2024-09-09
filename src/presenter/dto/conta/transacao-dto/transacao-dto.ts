import { IsNumber, IsUUID } from 'class-validator';

export class TransacaoDto {
  @IsNumber()
  valor: number;

  @IsUUID()
  contaId: string;
}
