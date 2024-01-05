import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PedidoDTO {
  @IsOptional()
  @IsString({ message: 'O ID deve ser uma string.' })
  id?: string;

  @IsNotEmpty({ message: 'A data de criação é obrigatória.' })
  @IsDateString({}, { message: 'A data de criação deve ser uma string de data válida.' })
  criadoEm: Date | string;

  @IsNotEmpty({ message: 'A data de atualização é obrigatória.' })
  @IsDateString({}, { message: 'A data de atualização deve ser uma string de data válida.' })
  atualizadoEm: Date | string;

  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  nome: string;

  @IsNotEmpty({ message: 'O endereço é obrigatório.' })
  @IsString({ message: 'O endereço deve ser uma string.' })
  endereco: string;

  @IsNotEmpty({ message: 'O status é obrigatório.' })
  @IsString({ message: 'O status deve ser uma string.' })
  status: string;
}
