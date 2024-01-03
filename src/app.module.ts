import { Module } from '@nestjs/common';
import { PedidoModule } from './modules/pedido/pedido.module';

@Module({
  imports: [PedidoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
