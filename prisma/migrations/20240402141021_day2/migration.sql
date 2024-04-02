-- CreateTable
CREATE TABLE "Logs" (
    "id" TEXT NOT NULL,
    "horarioTratador" TIMESTAMP(3) NOT NULL,
    "horarioAerador" TIMESTAMP(3) NOT NULL,
    "grausTemp" DECIMAL(65,30) NOT NULL,
    "horarioTempetura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);
