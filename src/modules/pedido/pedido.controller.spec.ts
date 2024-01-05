import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prismaService';
import { PedidoController } from './pedido.controller';
import { PedidoDTO } from './pedido.dto';
import { PedidoService } from './pedido.service';

describe('PedidoController', () => {
  let controller: PedidoController;
  let service: PedidoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidoController],
      providers: [PedidoService, PrismaService],
    }).compile();

    controller = module.get<PedidoController>(PedidoController);
    service = module.get<PedidoService>(PedidoService);
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
        criadoEm: new Date(),
        atualizadoEm: new Date(),
        nome: 'João',
        endereco: 'Rua ABC, 123',
        status: 'pendente',
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(pedidoDTO);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(pedidoDTO);
    });
  });

  describe('findAll', () => {
    it('should return an array of pedidos', async () => {
      const mockPedidos = [
        { id: '1', criadoEm: new Date(), atualizadoEm: new Date(), nome: 'João', endereco: 'Rua ABC, 123', status: 'pendente' },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockPedidos);

      const result = await controller.findAll();

      expect(result).toEqual(mockPedidos);
      expect(service.findAll).toHaveBeenCalled();
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

      const expectedResult = {
        id: pedidoId,
        criadoEm: new Date(),
        atualizadoEm: new Date(),
        nome: 'Novo Nome',
        endereco: 'Nova Rua, 456',
        status: 'atualizado',
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

      const result = await controller.update(pedidoId, updatedPedidoData);

      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(pedidoId, updatedPedidoData);
    });
  });

  describe('delete', () => {
    it('should delete the specified pedido', async () => {
      const pedidoId = '1';

      const expectedResult = {
        id: pedidoId,
        criadoEm: new Date(),
        atualizadoEm: new Date(),
        nome: 'Nome Existente',
        endereco: 'Rua Existente, 123',
        status: 'existente',
      };

      jest.spyOn(service, 'delete').mockResolvedValue(expectedResult);

      const result = await controller.delete(pedidoId);

      expect(result).toEqual(expectedResult);
      expect(service.delete).toHaveBeenCalledWith(pedidoId);
    });
  });
});
