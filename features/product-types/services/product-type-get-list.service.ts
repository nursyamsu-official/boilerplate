import { productTypeListRepository } from "../repositories/product-type-list.repository";
import type { ProductTypeListFilters } from "../types/product-type.type";

export async function productTypeGetListService(filters: ProductTypeListFilters) {
  return productTypeListRepository(filters);
}
