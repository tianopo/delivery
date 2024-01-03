import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CadastroUserDto } from './dto/cadastro-user.dto';
import { LoginDto } from './dto/login-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Post('/cadastro')
  async cadastro(@Body() data: CadastroUserDto) {
    return this.authService.cadastrar(data);
  }
}
