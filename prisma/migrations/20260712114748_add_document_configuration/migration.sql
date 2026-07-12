-- CreateTable
CREATE TABLE "doc_categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doc_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doc_types" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "category_id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "number_prefix" TEXT NOT NULL,
    "number_separator" TEXT NOT NULL DEFAULT '/',
    "number_start" INTEGER NOT NULL,
    "number_end" INTEGER NOT NULL,
    "number_current" INTEGER NOT NULL,
    "number_padding" INTEGER NOT NULL DEFAULT 5,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doc_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "doc_categories_code_key" ON "doc_categories"("code");

-- CreateIndex
CREATE INDEX "doc_categories_is_active_idx" ON "doc_categories"("is_active");

-- CreateIndex
CREATE INDEX "doc_types_category_id_idx" ON "doc_types"("category_id");

-- CreateIndex
CREATE INDEX "doc_types_is_active_idx" ON "doc_types"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "doc_types_category_id_code_key" ON "doc_types"("category_id", "code");

-- AddForeignKey
ALTER TABLE "doc_types" ADD CONSTRAINT "doc_types_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "doc_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
