-- CreateTable
CREATE TABLE "addr_countries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addr_countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addr_provinces" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "countryId" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addr_provinces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addr_districts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "provinceId" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addr_districts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "addr_countries_code_key" ON "addr_countries"("code");

-- CreateIndex
CREATE INDEX "addr_countries_isActive_idx" ON "addr_countries"("isActive");

-- CreateIndex
CREATE INDEX "addr_provinces_countryId_idx" ON "addr_provinces"("countryId");

-- CreateIndex
CREATE INDEX "addr_provinces_isActive_idx" ON "addr_provinces"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "addr_provinces_countryId_code_key" ON "addr_provinces"("countryId", "code");

-- CreateIndex
CREATE INDEX "addr_districts_provinceId_idx" ON "addr_districts"("provinceId");

-- CreateIndex
CREATE INDEX "addr_districts_isActive_idx" ON "addr_districts"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "addr_districts_provinceId_code_key" ON "addr_districts"("provinceId", "code");

-- AddForeignKey
ALTER TABLE "addr_provinces" ADD CONSTRAINT "addr_provinces_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "addr_countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addr_districts" ADD CONSTRAINT "addr_districts_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "addr_provinces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
