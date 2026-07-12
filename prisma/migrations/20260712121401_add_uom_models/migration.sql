-- CreateEnum
CREATE TYPE "UomType" AS ENUM ('WEIGHT', 'VOLUME', 'LENGTH', 'COUNT', 'OTHER');

-- CreateTable
CREATE TABLE "md_uoms" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT,
    "description" TEXT,
    "uom_type" "UomType" NOT NULL DEFAULT 'OTHER',
    "decimal_places" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "md_uoms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "md_uom_global_conversions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "from_uom_id" UUID NOT NULL,
    "to_uom_id" UUID NOT NULL,
    "conversion_factor" DECIMAL(18,6) NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "md_uom_global_conversions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "md_uoms_code_key" ON "md_uoms"("code");

-- CreateIndex
CREATE INDEX "md_uoms_is_active_idx" ON "md_uoms"("is_active");

-- CreateIndex
CREATE INDEX "md_uoms_uom_type_idx" ON "md_uoms"("uom_type");

-- CreateIndex
CREATE INDEX "md_uom_global_conversions_from_uom_id_idx" ON "md_uom_global_conversions"("from_uom_id");

-- CreateIndex
CREATE INDEX "md_uom_global_conversions_to_uom_id_idx" ON "md_uom_global_conversions"("to_uom_id");

-- CreateIndex
CREATE INDEX "md_uom_global_conversions_is_active_idx" ON "md_uom_global_conversions"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "md_uom_global_conversions_from_uom_id_to_uom_id_key" ON "md_uom_global_conversions"("from_uom_id", "to_uom_id");

-- AddForeignKey
ALTER TABLE "md_uom_global_conversions" ADD CONSTRAINT "md_uom_global_conversions_from_uom_id_fkey" FOREIGN KEY ("from_uom_id") REFERENCES "md_uoms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "md_uom_global_conversions" ADD CONSTRAINT "md_uom_global_conversions_to_uom_id_fkey" FOREIGN KEY ("to_uom_id") REFERENCES "md_uoms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
