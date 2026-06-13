import { userListRepository } from "../repositories/user-list.repository";
import type { UserListFilters } from "../types/user.type";

export async function userGetListService(filters: UserListFilters) {
  return userListRepository(filters);
}
