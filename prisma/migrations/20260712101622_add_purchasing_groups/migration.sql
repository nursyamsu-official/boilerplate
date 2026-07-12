-- CreateTable
CREATE TABLE "os_purchasing_groups" (
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

    CONSTRAINT "os_purchasing_groups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "os_purchasing_groups_companyId_idx" ON "os_purchasing_groups"("companyId");

-- CreateIndex
CREATE INDEX "os_purchasing_groups_parentId_idx" ON "os_purchasing_groups"("parentId");

-- CreateIndex
CREATE INDEX "os_purchasing_groups_isActive_idx" ON "os_purchasing_groups"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "os_purchasing_groups_companyId_code_key" ON "os_purchasing_groups"("companyId", "code");

-- AddForeignKey
ALTER TABLE "os_purchasing_groups" ADD CONSTRAINT "os_purchasing_groups_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "os_companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "os_purchasing_groups" ADD CONSTRAINT "os_purchasing_groups_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "os_purchasing_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
