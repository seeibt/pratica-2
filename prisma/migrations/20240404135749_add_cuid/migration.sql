-- CreateTable
CREATE TABLE "Logs" (
    "id" TEXT NOT NULL,
    "horarioTratador" TIMESTAMP(3) NOT NULL,
    "horarioAerador" TIMESTAMP(3) NOT NULL,
    "horarioTemperatura" TIMESTAMP(3),
    "grausTemp" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
