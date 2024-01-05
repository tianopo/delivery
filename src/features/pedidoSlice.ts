import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';

interface PedidoState {
  id: string | null;
  nome: string | null;
  endereco: string | null;
  status: string | null;
}

export interface PedidoArrayState {
  pedidos: PedidoState[];
}

const initialState: PedidoArrayState = {
  pedidos: [],
};

export const pedidoSlice = createSlice({
  name: 'pedido',
  initialState,
  reducers: {
    obter: (state, action: PayloadAction<PedidoState>) => {
      state.pedidos.push(action.payload);
    },

    atualizarStatus: (state, action: PayloadAction<{ id: string; status: string }>) => {
      const pedido = state.pedidos.find((p) => p.id === action.payload.id);
      if (pedido) {
        pedido.status = action.payload.status;
      }
    },
  },
});

export const selectPedidos = (state: RootState) => state.pedido.pedidos;

export const { obter, atualizarStatus } = pedidoSlice.actions;

export default pedidoSlice.reducer;
