import { productGetByIdRepository } from "../repositories/product-create.repository";
import type { ProductDetail } from "../types/product.type";

export async function productGetByIdService(id: string): Promise<ProductDetail> {
  const product = await productGetByIdRepository(id);
  if (!product) {
    throw new Error("Product not found");
  }

  return {
    id: product.id,
    code: product.code,
    name: product.name,
    description: product.description,
    productTypeId: product.productTypeId,
    productGroupId: product.productGroupId,
    productCategoryId: product.productCategoryId,
    baseUomId: product.baseUomId,
    isActive: product.isActive,
  };
}
