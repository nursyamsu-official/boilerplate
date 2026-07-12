import {
  productCategoryGetGroupIdRepository,
  productCreateRepository,
  productGetByCodeRepository,
} from "../repositories/product-create.repository";
import type { ProductCreateInput } from "../schemas/product-create.schema";

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

export async function productCreateService(input: ProductCreateInput) {
  const existing = await productGetByCodeRepository(input.code);
  if (existing) {
    throw new Error("Product code already exists");
  }

  await validateProductCategoryBelongsToGroup(
    input.productCategoryId,
    input.productGroupId,
  );

  return productCreateRepository(input);
}
