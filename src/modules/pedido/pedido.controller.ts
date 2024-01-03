import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoDTO } from './pedido.dto';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async create(@Body() data: PedidoDTO) {
    return this.pedidoService.create(data);
  }

  @Get()
  async findAll() {
    return this.pedidoService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: PedidoDTO) {
    return this.pedidoService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.pedidoService.delete(id);
  }
}
