import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { PrismaService as RealPrismaService } from 'src/database/prismaService';
import { UserService } from 'src/modules/user/user.service';
import { AuthService } from '../../src/modules/autenticacao/auth.service';
import { CadastroUserDto } from "../../src/modules/autenticacao/dto/cadastro-user.dto";
import { LoginDto } from '../../src/modules/autenticacao/dto/login-user.dto';

jest.mock('src/database/prismaService', () => {
  const originalModule = jest.requireActual('src/database/prismaService');
  return {
    ...originalModule,
    PrismaService: {
      ...originalModule.PrismaService,
      user: {
        findUnique: jest.fn(),
      },
    },
  };
});

describe('AuthService', () => {
  let service: AuthService;
  let prismaServiceMock: jest.Mocked<RealPrismaService>;
  let jwtServiceMock: jest.Mocked<JwtService>;
  let userServiceMock: jest.Mocked<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: RealPrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaServiceMock = module.get(RealPrismaService);
    jwtServiceMock = module.get(JwtService);
    userServiceMock = module.get(UserService);
  });

  describe('login', () => {
    it('should return a token if login is successful', async () => {
      const loginDto: LoginDto = {
        email: 'existing@example.com',
        senha: 'validPassword',
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      };

      const userMock = {
        id: '1',
        nome: 'John Doe',
        email: 'existing@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      };

      jest.spyOn(prismaServiceMock.user, 'findUnique').mockResolvedValue(userMock);

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jwtServiceMock.sign.mockReturnValue('fakeToken');

      const result = await service.login(loginDto);

      expect(result).toEqual({ token: 'fakeToken' });
    });
  });

  describe('cadastrar', () => {
    it('should create a user and return a token', async () => {
      const cadastrarDto: CadastroUserDto = {
        nome: 'John Doe',
        senha: 'validPassword',
        email: 'john@example.com',
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      };

      const createdUser = {
        id: '1',
        nome: 'John Doe',
        email: 'john@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      };

      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      jest.spyOn(userServiceMock, 'create').mockResolvedValue(createdUser);
      jwtServiceMock.sign.mockReturnValue('fakeToken');

      const result = await service.cadastrar(cadastrarDto);

      expect(result).toEqual({ token: 'fakeToken' });

      expect(userServiceMock.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...cadastrarDto,
          senha: 'hashedPassword',
          criadoEm: expect.any(Date),
          atualizadoEm: expect.any(Date),
        })
      );

      expect(bcrypt.hash).toHaveBeenCalledWith('validPassword', 10);
    });
  });
});
