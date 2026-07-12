import { productGroupListRepository } from "../repositories/product-group-list.repository";
import type { ProductGroupListFilters } from "../types/product-group.type";

export async function productGroupGetListService(filters: ProductGroupListFilters) {
  return productGroupListRepository(filters);
}
