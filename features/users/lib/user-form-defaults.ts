import type { UserDetail, UserFormValues } from "../types/user.type";

export const defaultUserFormValues: UserFormValues = {
  name: "",
  email: "",
  username: null,
  phoneNumber: null,
  status: "ACTIVE",
  roleIds: [],
  password: "",
};

export const defaultUserCreateFormValues: UserFormValues = {
  ...defaultUserFormValues,
  password: "",
};

export function mapUserDetailToFormValues(detail: UserDetail): UserFormValues {
  return {
    name: detail.name,
    email: detail.email,
    username: detail.username,
    phoneNumber: detail.phoneNumber,
    status: detail.status,
    roleIds: detail.roleIds,
  };
}
