import { productCategoryGetByIdRepository } from "../repositories/product-category-create.repository";
import type { ProductCategoryDetail } from "../types/product-category.type";

export async function productCategoryGetByIdService(id: string): Promise<ProductCategoryDetail> {
  const country = await productCategoryGetByIdRepository(id);
  if (!country) {
    throw new Error("Product category not found");
  }

  return {
    id: country.id,
    groupId: country.groupId,
    code: country.code,
    name: country.name,
    description: country.description,
    isActive: country.isActive,
  };
}
