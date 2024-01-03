import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://portfolio-ten-weld-61.vercel.app/',
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
  }),
});

export const { useLoginUserMutation } = authApi;
