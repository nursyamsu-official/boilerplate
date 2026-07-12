-- CreateTable
CREATE TABLE "os_logistic_units" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "companyId" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "parentId" UUID,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "os_logistic_units_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "os_logistic_units_companyId_idx" ON "os_logistic_units"("companyId");

-- CreateIndex
CREATE INDEX "os_logistic_units_parentId_idx" ON "os_logistic_units"("parentId");

-- CreateIndex
CREATE INDEX "os_logistic_units_isActive_idx" ON "os_logistic_units"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "os_logistic_units_companyId_code_key" ON "os_logistic_units"("companyId", "code");

-- AddForeignKey
ALTER TABLE "os_logistic_units" ADD CONSTRAINT "os_logistic_units_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "os_companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "os_logistic_units" ADD CONSTRAINT "os_logistic_units_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "os_logistic_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;
