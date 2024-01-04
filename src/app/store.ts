import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import authReducer from 'src/features/authSlice';
import pedidoReducer from 'src/features/pedidoSlice';
import { authApi } from 'src/services/authApi';
import { pedidoApi } from "src/services/pedidoApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pedido: pedidoReducer,
    [authApi.reducerPath]: authApi.reducer,
    [pedidoApi.reducerPath]: pedidoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, pedidoApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
