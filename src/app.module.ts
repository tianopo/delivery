import { Module } from '@nestjs/common';
import { AuthModule } from './modules/autenticacao/auth.module';
import { PedidoModule } from './modules/pedido/pedido.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [PedidoModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
