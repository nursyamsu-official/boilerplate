import {
  productTypeCountProductsRepository,
  productTypeGetByIdRepository,
} from "../repositories/product-type-create.repository";
import { productTypeDeleteRepository } from "../repositories/product-type-delete.repository";

export async function productTypeDeleteService(id: string) {
  const country = await productTypeGetByIdRepository(id);
  if (!country) {
    throw new Error("Product Type not found");
  }

  const productCount = await productTypeCountProductsRepository(id);
  if (productCount > 0) {
    throw new Error("Cannot delete product type with products");
  }

  return productTypeDeleteRepository(id);
}
