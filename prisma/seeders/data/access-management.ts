export type RoleSeed = {
  code: string;
  name: string;
  description: string;
};

export type ModuleSeed = {
  code: string;
  name: string;
  description: string;
  sortOrder: number;
};

export type PermissionSeed = {
  code: string;
  name: string;
  description: string;
  moduleCode: string;
};

export type RolePermissionSeed = {
  roleCode: string;
  permissionCodes: string[];
};

export const roles: RoleSeed[] = [
  {
    code: "super_admin",
    name: "Super Admin",
    description: "Full unrestricted access to all system features",
  },
  {
    code: "admin",
    name: "Admin",
    description: "Administrative access to manage day-to-day operations",
  },
  {
    code: "user",
    name: "User",
    description: "Standard user with limited access",
  },
];

export const modules: ModuleSeed[] = [
  {
    code: "user_management",
    name: "User Management",
    description: "Manage users and their access",
    sortOrder: 1,
  },
  {
    code: "role_management",
    name: "Role Management",
    description: "Manage roles, permissions, and menus",
    sortOrder: 2,
  },
  {
    code: "email_management",
    name: "Email Management",
    description: "Manage email settings, templates, and logs",
    sortOrder: 3,
  },
  {
    code: "api_management",
    name: "API Management",
    description: "Manage API keys and usage",
    sortOrder: 4,
  },
  {
    code: "webhook_management",
    name: "Webhook Management",
    description: "Manage webhooks and deliveries",
    sortOrder: 5,
  },
  {
    code: "system_management",
    name: "System Management",
    description: "Manage system-wide settings",
    sortOrder: 6,
  },
];

export const permissions: PermissionSeed[] = [
  {
    code: "manage_user",
    name: "Manage User",
    description: "Create, update, and remove users",
    moduleCode: "user_management",
  },
  {
    code: "manage_role",
    name: "Manage Role",
    description: "Create, update, and remove roles",
    moduleCode: "role_management",
  },
  {
    code: "manage_permission",
    name: "Manage Permission",
    description: "Assign and revoke permissions",
    moduleCode: "role_management",
  },
  {
    code: "manage_menu",
    name: "Manage Menu",
    description: "Create, update, and remove menus",
    moduleCode: "role_management",
  },
  {
    code: "manage_email",
    name: "Manage Email",
    description: "Manage email settings and templates",
    moduleCode: "email_management",
  },
  {
    code: "manage_api",
    name: "Manage API",
    description: "Manage API keys and access",
    moduleCode: "api_management",
  },
  {
    code: "manage_webhook",
    name: "Manage Webhook",
    description: "Manage webhooks and deliveries",
    moduleCode: "webhook_management",
  },
  {
    code: "manage_system_setting",
    name: "Manage System Setting",
    description: "Manage system-wide settings",
    moduleCode: "system_management",
  },
];

const allPermissionCodes = permissions.map((permission) => permission.code);

export const rolePermissions: RolePermissionSeed[] = [
  {
    roleCode: "super_admin",
    permissionCodes: allPermissionCodes,
  },
  {
    roleCode: "admin",
    permissionCodes: allPermissionCodes.filter(
      (code) => code !== "manage_permission" && code !== "manage_system_setting",
    ),
  },
  {
    roleCode: "user",
    permissionCodes: [],
  },
];
