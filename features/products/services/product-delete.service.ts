import { productGetByIdRepository } from "../repositories/product-create.repository";
import { productDeleteRepository } from "../repositories/product-delete.repository";

export async function productDeleteService(id: string) {
  const product = await productGetByIdRepository(id);
  if (!product) {
    throw new Error("Product not found");
  }

  return productDeleteRepository(id);
}
