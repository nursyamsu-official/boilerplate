export type PermissionOption = {
  id: string;
  code: string;
  name: string;
  description: string | null;
};

export type PermissionOptionGroup = {
  moduleId: string | null;
  moduleName: string;
  permissions: PermissionOption[];
};
