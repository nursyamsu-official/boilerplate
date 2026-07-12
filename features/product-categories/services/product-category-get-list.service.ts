import { productCategoryListRepository } from "../repositories/product-category-list.repository";
import type { ProductCategoryListFilters } from "../types/product-category.type";

export async function productCategoryGetListService(filters: ProductCategoryListFilters) {
  return productCategoryListRepository(filters);
}
