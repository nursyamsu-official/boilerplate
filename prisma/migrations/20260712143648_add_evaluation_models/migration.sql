-- CreateTable
CREATE TABLE "md_evaluation_methods" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "md_evaluation_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "md_evaluation_scoring_methods" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "md_evaluation_scoring_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "md_evaluation_templates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "evaluation_method_id" UUID NOT NULL,
    "evaluation_scoring_method_id" UUID NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "md_evaluation_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "md_evaluation_criteria" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "template_id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "weight" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "max_score" DECIMAL(8,2),
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "md_evaluation_criteria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "md_evaluation_methods_code_key" ON "md_evaluation_methods"("code");

-- CreateIndex
CREATE INDEX "md_evaluation_methods_is_active_idx" ON "md_evaluation_methods"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "md_evaluation_scoring_methods_code_key" ON "md_evaluation_scoring_methods"("code");

-- CreateIndex
CREATE INDEX "md_evaluation_scoring_methods_is_active_idx" ON "md_evaluation_scoring_methods"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "md_evaluation_templates_code_key" ON "md_evaluation_templates"("code");

-- CreateIndex
CREATE INDEX "md_evaluation_templates_evaluation_method_id_idx" ON "md_evaluation_templates"("evaluation_method_id");

-- CreateIndex
CREATE INDEX "md_evaluation_templates_evaluation_scoring_method_id_idx" ON "md_evaluation_templates"("evaluation_scoring_method_id");

-- CreateIndex
CREATE INDEX "md_evaluation_templates_is_active_idx" ON "md_evaluation_templates"("is_active");

-- CreateIndex
CREATE INDEX "md_evaluation_criteria_template_id_idx" ON "md_evaluation_criteria"("template_id");

-- CreateIndex
CREATE INDEX "md_evaluation_criteria_is_active_idx" ON "md_evaluation_criteria"("is_active");

-- CreateIndex
CREATE INDEX "md_evaluation_criteria_sort_order_idx" ON "md_evaluation_criteria"("sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "md_evaluation_criteria_template_id_code_key" ON "md_evaluation_criteria"("template_id", "code");

-- AddForeignKey
ALTER TABLE "md_evaluation_templates" ADD CONSTRAINT "md_evaluation_templates_evaluation_method_id_fkey" FOREIGN KEY ("evaluation_method_id") REFERENCES "md_evaluation_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "md_evaluation_templates" ADD CONSTRAINT "md_evaluation_templates_evaluation_scoring_method_id_fkey" FOREIGN KEY ("evaluation_scoring_method_id") REFERENCES "md_evaluation_scoring_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "md_evaluation_criteria" ADD CONSTRAINT "md_evaluation_criteria_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "md_evaluation_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
