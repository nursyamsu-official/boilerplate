import { productListRepository } from "../repositories/product-list.repository";
import type { ProductListFilters } from "../types/product.type";

export async function productGetListService(filters: ProductListFilters) {
  return productListRepository(filters);
}
