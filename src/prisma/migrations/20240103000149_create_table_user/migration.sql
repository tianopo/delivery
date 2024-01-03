-- CreateTable
CREATE TABLE "autenticacao" (
    "id" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "acesso" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "token" TEXT,
    "codigoSeguranca" VARCHAR(10),

    CONSTRAINT "autenticacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "autenticacao_id_key" ON "autenticacao"("id");

-- CreateIndex
CREATE UNIQUE INDEX "autenticacao_email_key" ON "autenticacao"("email");
