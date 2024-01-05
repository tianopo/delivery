import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prismaService';
import { PedidoDTO } from './pedido.dto';
import { PedidoService } from './pedido.service';

describe('PedidoService', () => {
  let pedidoService: PedidoService;
  let prismaServiceMock: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidoService, PrismaService],
    }).compile();

    pedidoService = module.get<PedidoService>(PedidoService);
    prismaServiceMock = module.get<PrismaService>(PrismaService) as jest.Mocked<PrismaService>;
  });

  describe('create', () => {
    it('should create a pedido', async () => {
      const pedidoDTO: PedidoDTO = {
        criadoEm: new Date(),
        atualizadoEm: new Date(),
        nome: 'João',
        endereco: 'Rua ABC, 123',
        status: 'pendente',
      };

      const expectedResult = {
        id: '1',
        criadoEm: expect.objectContaining({}),
        atualizadoEm: expect.objectContaining({}),
        nome: 'João',
        endereco: 'Rua ABC, 123',
        status: 'pendente',
      };

      jest.spyOn(prismaServiceMock.pedido, 'create').mockResolvedValue(expectedResult);

      const result = await pedidoService.create(pedidoDTO);

      expect(result).toEqual(expectedResult);
      expect(prismaServiceMock.pedido.create).toHaveBeenCalledWith({
        data: {
          ...pedidoDTO,
          status: 'pendente',
          criadoEm: expect.any(Date),
          atualizadoEm: expect.any(Date),
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of pedidos', async () => {
      const mockPedidos = [
        { id: '1', criadoEm: new Date(), atualizadoEm: new Date(), nome: 'João', endereco: 'Rua ABC, 123', status: 'pendente' },
      ];

      jest.spyOn(prismaServiceMock.pedido, 'findMany').mockResolvedValue(mockPedidos);

      const result = await pedidoService.findAll();

      expect(result).toEqual(mockPedidos);
      expect(prismaServiceMock.pedido.findMany).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update the specified pedido', async () => {
      const pedidoId = '1';
      const updatedPedidoData: PedidoDTO = {
        criadoEm: new Date(),
        atualizadoEm: new Date(),
        nome: 'Novo Nome',
        endereco: 'Nova Rua, 456',
        status: 'atualizado',
      };

      const existingPedidoData = {
        id: pedidoId,
        criadoEm: new Date(),
        atualizadoEm: new Date(),
        nome: 'Nome Existente',
        endereco: 'Rua Existente, 123',
        status: 'existente',
      };

      jest.spyOn(prismaServiceMock.pedido, 'findUnique').mockResolvedValue(existingPedidoData);

      const updatedPedidoResult = {
        id: pedidoId,
        criadoEm: new Date(),
        atualizadoEm: new Date(),
        nome: 'Nome Existente',
        endereco: 'Rua Existente, 123',
        status: 'existente',
      };

      // Configuração do mock para garantir que a função seja um mock
      jest.spyOn(prismaServiceMock.pedido, 'update').mockResolvedValue(updatedPedidoResult);

      const result = await pedidoService.update(pedidoId, updatedPedidoData);

      // Ajuste para comparar o resultado com o objeto retornado pelo Prisma
      expect(result).toEqual(updatedPedidoResult);
      expect(prismaServiceMock.pedido.findUnique).toHaveBeenCalledWith({ where: { id: pedidoId } });
      expect(prismaServiceMock.pedido.update).toHaveBeenCalledWith({
        data: { ...updatedPedidoData, atualizadoEm: expect.any(Date) },
        where: { id: pedidoId },
      });

      // Ajuste para verificar se a função update foi chamada
      expect(prismaServiceMock.pedido.update).toHaveBeenCalled();
    });

    it('should throw an error if the specified pedido does not exist', async () => {
      const pedidoId = 'invalidId';
      const updatedPedidoData: PedidoDTO = {
        criadoEm: new Date(),
        atualizadoEm: new Date(),
        nome: 'Novo Nome',
        endereco: 'Nova Rua, 456',
        status: 'atualizado',
      };

      jest.spyOn(prismaServiceMock.pedido, 'findUnique').mockResolvedValue(null);

      await expect(pedidoService.update(pedidoId, updatedPedidoData)).rejects.toThrowError('Pedido não existe!');
      expect(prismaServiceMock.pedido.findUnique).toHaveBeenCalledWith({ where: { id: pedidoId } });
    });
  });

  describe('delete', () => {
    it('should delete the specified pedido', async () => {
      const pedidoId = '1';

      // Ajuste para incluir mais propriedades no objeto retornado por findUnique
      jest.spyOn(prismaServiceMock.pedido, 'findUnique').mockResolvedValue({
        id: pedidoId,
        criadoEm: new Date(),
        atualizadoEm: new Date(),
        nome: 'Nome Existente',
        endereco: 'Rua Existente, 123',
        status: 'existente',
      });

      jest.spyOn(prismaServiceMock.pedido, 'delete').mockResolvedValue({
        id: pedidoId,
        criadoEm: new Date(),
        atualizadoEm: new Date(),
        nome: 'Nome Existente',
        endereco: 'Rua Existente, 123',
        status: 'existente',
      });

      const result = await pedidoService.delete(pedidoId);

      expect(prismaServiceMock.pedido.findUnique).toHaveBeenCalledWith({ where: { id: pedidoId } });
      expect(prismaServiceMock.pedido.delete).toHaveBeenCalledWith({ where: { id: pedidoId } });
    });

    it('should throw an error if the specified pedido does not exist', async () => {
      const pedidoId = 'invalidId';

      // Ajuste para retornar null quando o pedido não existe
      jest.spyOn(prismaServiceMock.pedido, 'findUnique').mockResolvedValue(null);

      await expect(pedidoService.delete(pedidoId)).rejects.toThrowError('Pedido não existe!');
      expect(prismaServiceMock.pedido.findUnique).toHaveBeenCalledWith({ where: { id: pedidoId } });
    });
  });
});
