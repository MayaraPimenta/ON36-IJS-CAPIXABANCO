import { IsString, Max, Min } from 'class-validator';

export class CriarClienteDto {
  @IsString()
  nome: string;

  @IsString()
  @Max(9)
  cep: string;

  @IsString()
  @Min(8)
  @Max(9)
  telefone: string;
}
