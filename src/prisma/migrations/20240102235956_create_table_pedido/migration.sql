-- CreateTable
CREATE TABLE "Pedido" (
    "id" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pedido_id_key" ON "Pedido"("id");
