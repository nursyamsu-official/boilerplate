import {
  productTypeCreateRepository,
  productTypeGetByCodeRepository,
} from "../repositories/product-type-create.repository";
import type { ProductTypeCreateInput } from "../schemas/product-type-create.schema";

export async function productTypeCreateService(input: ProductTypeCreateInput) {
  const existing = await productTypeGetByCodeRepository(input.code);
  if (existing) {
    throw new Error("Product type code already exists");
  }

  return productTypeCreateRepository(input);
}
