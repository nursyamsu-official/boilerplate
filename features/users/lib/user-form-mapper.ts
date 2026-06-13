import type {
  UserCreateInput,
  UserUpdateInput,
} from "../schemas/user-create.schema";
import type { UserFormValues } from "../types/user.type";

export function mapFormValuesToUserCreateInput(
  values: UserFormValues,
): UserCreateInput {
  if (!values.password) {
    throw new Error("Password is required");
  }

  return {
    name: values.name,
    email: values.email,
    username: values.username,
    phoneNumber: values.phoneNumber,
    status: values.status,
    roleIds: values.roleIds,
    password: values.password,
  };
}

export function mapFormValuesToUserUpdateInput(
  id: string,
  values: UserFormValues,
): UserUpdateInput {
  return {
    id,
    name: values.name,
    email: values.email,
    username: values.username,
    phoneNumber: values.phoneNumber,
    status: values.status,
    roleIds: values.roleIds,
  };
}
