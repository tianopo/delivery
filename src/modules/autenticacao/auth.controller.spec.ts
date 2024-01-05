import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CadastroUserDto } from './dto/cadastro-user.dto';
import { LoginDto } from './dto/login-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authServiceMock: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            cadastrar: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authServiceMock = module.get(AuthService);
  });

  describe('/login', () => {
    it('should return the result from AuthService.login', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        senha: 'password',
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      };

      authServiceMock.login.mockResolvedValue({ token: 'fakeToken' });

      const result = await controller.login(loginDto);

      expect(result).toEqual({ token: 'fakeToken' });
      expect(authServiceMock.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('/cadastro', () => {
    it('should return the result from AuthService.cadastrar', async () => {
      const cadastrarDto: CadastroUserDto = {
        nome: 'John Doe',
        email: 'john@example.com',
        senha: 'password',
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      };

      authServiceMock.cadastrar.mockResolvedValue({ token: 'fakeToken' });

      const result = await controller.cadastro(cadastrarDto);

      expect(result).toEqual({ token: 'fakeToken' });
      expect(authServiceMock.cadastrar).toHaveBeenCalledWith(cadastrarDto);
    });
  });
});
