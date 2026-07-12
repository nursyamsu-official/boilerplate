import {
  productGroupCreateRepository,
  productGroupGetByCodeRepository,
} from "../repositories/product-group-create.repository";
import type { ProductGroupCreateInput } from "../schemas/product-group-create.schema";

export async function productGroupCreateService(input: ProductGroupCreateInput) {
  const existing = await productGroupGetByCodeRepository(input.code);
  if (existing) {
    throw new Error("Product group code already exists");
  }

  return productGroupCreateRepository(input);
}
