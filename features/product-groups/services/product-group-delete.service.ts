import {
  productGroupCountCategoriesRepository,
  productGroupCountProductsRepository,
  productGroupGetByIdRepository,
} from "../repositories/product-group-create.repository";
import { productGroupDeleteRepository } from "../repositories/product-group-delete.repository";

export async function productGroupDeleteService(id: string) {
  const productGroup = await productGroupGetByIdRepository(id);
  if (!productGroup) {
    throw new Error("Product group not found");
  }

  const categoryCount = await productGroupCountCategoriesRepository(id);
  if (categoryCount > 0) {
    throw new Error("Cannot delete product group with categories");
  }

  const productCount = await productGroupCountProductsRepository(id);
  if (productCount > 0) {
    throw new Error("Cannot delete product group with products");
  }

  return productGroupDeleteRepository(id);
}
