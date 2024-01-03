import { IsEmail, IsString, Length } from "class-validator";

export class CadastroUserDto {
  @IsString()
  @Length(5, 10)
  nome: string;
  @IsString()
  @Length(6, 12)
  senha: string;
  @IsEmail()
  email: string;
}