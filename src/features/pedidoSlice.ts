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
  },
});

export const selectPedidos = (state: RootState) => state.pedido.pedidos;

export const { obter } = pedidoSlice.actions;

export default pedidoSlice.reducer;
