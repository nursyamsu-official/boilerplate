-- CreateTable
CREATE TABLE "md_product_types" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "md_product_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "md_product_groups" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "md_product_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "md_product_categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "group_id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "md_product_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "md_products" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "product_type_id" UUID NOT NULL,
    "product_group_id" UUID NOT NULL,
    "product_category_id" UUID NOT NULL,
    "base_uom_id" UUID,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "md_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "md_product_types_code_key" ON "md_product_types"("code");

-- CreateIndex
CREATE INDEX "md_product_types_is_active_idx" ON "md_product_types"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "md_product_groups_code_key" ON "md_product_groups"("code");

-- CreateIndex
CREATE INDEX "md_product_groups_is_active_idx" ON "md_product_groups"("is_active");

-- CreateIndex
CREATE INDEX "md_product_categories_group_id_idx" ON "md_product_categories"("group_id");

-- CreateIndex
CREATE INDEX "md_product_categories_is_active_idx" ON "md_product_categories"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "md_product_categories_group_id_code_key" ON "md_product_categories"("group_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "md_products_code_key" ON "md_products"("code");

-- CreateIndex
CREATE INDEX "md_products_product_type_id_idx" ON "md_products"("product_type_id");

-- CreateIndex
CREATE INDEX "md_products_product_group_id_idx" ON "md_products"("product_group_id");

-- CreateIndex
CREATE INDEX "md_products_product_category_id_idx" ON "md_products"("product_category_id");

-- CreateIndex
CREATE INDEX "md_products_base_uom_id_idx" ON "md_products"("base_uom_id");

-- CreateIndex
CREATE INDEX "md_products_is_active_idx" ON "md_products"("is_active");

-- AddForeignKey
ALTER TABLE "md_product_categories" ADD CONSTRAINT "md_product_categories_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "md_product_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "md_products" ADD CONSTRAINT "md_products_product_type_id_fkey" FOREIGN KEY ("product_type_id") REFERENCES "md_product_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "md_products" ADD CONSTRAINT "md_products_product_group_id_fkey" FOREIGN KEY ("product_group_id") REFERENCES "md_product_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "md_products" ADD CONSTRAINT "md_products_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "md_product_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "md_products" ADD CONSTRAINT "md_products_base_uom_id_fkey" FOREIGN KEY ("base_uom_id") REFERENCES "md_uoms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
