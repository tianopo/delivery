import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prismaService';
import { User } from 'src/modules/user/user.model';
import { UserService } from 'src/modules/user/user.service';
import { CadastroUserDto } from './dto/cadastro-user.dto';
import { LoginDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, senha } = loginDto;
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!email) {
      throw new Error('usuário não encontrado');
    }
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      throw new Error('Senha inválida');
    }

    return {
      token: this.jwtService.sign({ email }),
    };
  }

  async cadastrar(criarDto: CadastroUserDto) {
    const criarUsuario = new User();
    criarUsuario.nome = criarDto.nome;
    criarUsuario.email = criarDto.email;
    criarUsuario.senha = await bcrypt.hash(criarDto.senha, 10);
    criarUsuario.criadoEm = new Date();
    criarUsuario.atualizadoEm = new Date();

    const user = await this.userService.create(criarUsuario);

    return {
      token: this.jwtService.sign({ email: user.email }),
    };
  }
}
