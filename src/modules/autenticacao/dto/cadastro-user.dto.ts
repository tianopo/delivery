import { IsDateString, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CadastroUserDto {
  @IsNotEmpty({ message: 'A data de criação é obrigatória.' })
  @IsDateString({}, { message: 'A data de criação deve ser uma string de data válida.' })
  criadoEm: Date | string;

  @IsNotEmpty({ message: 'A data de atualização é obrigatória.' })
  @IsDateString({}, { message: 'A data de atualização deve ser uma string de data válida.' })
  atualizadoEm: Date | string;

  @IsString()
  @Length(5, 10)
  nome: string;

  @IsString()
  @Length(6, 12)
  senha: string;

  @IsEmail()
  email: string;
}
