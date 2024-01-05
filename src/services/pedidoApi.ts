import { Pedido } from "@prisma/client";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pedidoApi = createApi({
  reducerPath: 'pedidoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
  }),
  endpoints: (builder) => ({
    pedidoPost: builder.mutation({
      query: (body: { nome: string; endereco: string; }) => {
        return {
          url: 'pedido',
          method: 'post',
          body,
        };
      },
    }),
    pedidoGet: builder.query<Pedido[], void>({
      query: () => 'pedido',
    }),
    pedidoPut: builder.mutation({
      query: (params: { id: string; body: { status: string } }) => {
        return {
          url: `pedido/${params.id}`,
          method: 'put',
          body: params.body,
        };
      },
    }),
  }),
});

export const { usePedidoPostMutation, usePedidoGetQuery, usePedidoPutMutation } = pedidoApi;
