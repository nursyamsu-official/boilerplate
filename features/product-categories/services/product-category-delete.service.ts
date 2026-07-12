import {
  productCategoryCountProductsRepository,
  productCategoryGetByIdRepository,
} from "../repositories/product-category-create.repository";
import { productCategoryDeleteRepository } from "../repositories/product-category-delete.repository";

export async function productCategoryDeleteService(id: string) {
  const country = await productCategoryGetByIdRepository(id);
  if (!country) {
    throw new Error("Product category not found");
  }

  const productCount = await productCategoryCountProductsRepository(id);
  if (productCount > 0) {
    throw new Error("Cannot delete product category with products");
  }

  return productCategoryDeleteRepository(id);
}
