import { productTypeGetByIdRepository } from "../repositories/product-type-create.repository";
import type { ProductTypeDetail } from "../types/product-type.type";

export async function productTypeGetByIdService(id: string): Promise<ProductTypeDetail> {
  const country = await productTypeGetByIdRepository(id);
  if (!country) {
    throw new Error("Product Type not found");
  }

  return {
    id: country.id,
    code: country.code,
    name: country.name,
    description: country.description,
    isActive: country.isActive,
  };
}
