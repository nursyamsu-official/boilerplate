import {
  productCategoryGetGroupIdRepository,
  productGetByCodeRepository,
  productGetByIdRepository,
} from "../repositories/product-create.repository";
import {
  productToggleStatusRepository,
  productUpdateRepository,
} from "../repositories/product-update.repository";
import type { ProductUpdateInput } from "../schemas/product-create.schema";

async function validateProductCategoryBelongsToGroup(
  productCategoryId: string,
  productGroupId: string,
) {
  const category = await productCategoryGetGroupIdRepository(productCategoryId);
  if (!category) {
    throw new Error("Product category not found");
  }

  if (category.groupId !== productGroupId) {
    throw new Error("Product category does not belong to the selected group");
  }
}

export async function productUpdateService(input: ProductUpdateInput) {
  const product = await productGetByIdRepository(input.id);
  if (!product) {
    throw new Error("Product not found");
  }

  const existing = await productGetByCodeRepository(input.code, input.id);
  if (existing) {
    throw new Error("Product code already exists");
  }

  await validateProductCategoryBelongsToGroup(
    input.productCategoryId,
    input.productGroupId,
  );

  return productUpdateRepository(input);
}

export async function productToggleStatusService(id: string) {
  const product = await productGetByIdRepository(id);
  if (!product) {
    throw new Error("Product not found");
  }

  return productToggleStatusRepository(id);
}
