import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prismaService';
import { PedidoDTO } from './pedido.dto';

@Injectable()
export class PedidoService {
  constructor(private prisma: PrismaService) {}

  async create(data: PedidoDTO) {
    const now = new Date();

    const pedido = await this.prisma.pedido.create({
      data: {
        ...data,
        status: 'pendente',
        criadoEm: now,
        atualizadoEm: now,
      },
    });

    return pedido;
  }

  async findAll() {
    return this.prisma.pedido.findMany();
  }

  async update(id: string, data: PedidoDTO) {
    const now = new Date();
    const pedidoExists = await this.prisma.pedido.findUnique({
      where: {
        id,
      },
    });

    if (!pedidoExists) {
      throw new Error('Pedido não existe!');
    }

    return await this.prisma.pedido.update({
      data: {
        ...data,
        atualizadoEm: now,
      },
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const pedidoExists = await this.prisma.pedido.findUnique({
      where: {
        id,
      },
    });

    if (!pedidoExists) {
      throw new Error('Pedido não existe!');
    }

    return await this.prisma.pedido.delete({
      where: {
        id,
      },
    });
  }
}
