import { productGroupGetByIdRepository } from "../repositories/product-group-create.repository";
import type { ProductGroupDetail } from "../types/product-group.type";

export async function productGroupGetByIdService(id: string): Promise<ProductGroupDetail> {
  const country = await productGroupGetByIdRepository(id);
  if (!country) {
    throw new Error("Product Group not found");
  }

  return {
    id: country.id,
    code: country.code,
    name: country.name,
    description: country.description,
    isActive: country.isActive,
  };
}
