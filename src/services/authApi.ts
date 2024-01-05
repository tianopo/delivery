import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Dotenv } from "../settings/dotenv";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Dotenv.frontUrl,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; senha: string }) => {
        return {
          url: 'auth/login',
          method: 'post',
          body,
        };
      },
    }),
    cadastroUser: builder.mutation({
      query: (body: { nome: string; email: string; senha: string }) => {
        return {
          url: 'auth/cadastro',
          method: 'post',
          body,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useCadastroUserMutation } = authApi;
