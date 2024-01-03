import { Prisma } from "@prisma/client";

export class User implements Prisma.UserCreateInput {
  id?: string;
  criadoEm: Date | string
  atualizadoEm: Date | string
  nome: string
  email: string
  senha: string
}