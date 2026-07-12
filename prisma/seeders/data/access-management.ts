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

export type MenuSeed = {
  code: string;
  label: string;
  path: string | null;
  icon: string | null;
  parentCode: string | null;
  sortOrder: number;
};

export type RoleMenuSeed = {
  roleCode: string;
  menuCode: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
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
    code: "sso_management",
    name: "SSO Management",
    description: "Manage SSO providers and user links",
    sortOrder: 6,
  },
  {
    code: "system_management",
    name: "System Management",
    description: "Manage system-wide settings",
    sortOrder: 7,
  },
  {
    code: "security_management",
    name: "Security Management",
    description: "Manage sessions, 2FA, API keys, and audit logs",
    sortOrder: 8,
  },
  {
    code: "organization_management",
    name: "Organization Management",
    description: "Manage companies, organizational units, logistic units, and purchasing groups",
    sortOrder: 9,
  },
  {
    code: "address_management",
    name: "Address Management",
    description: "Manage countries, provinces, and districts",
    sortOrder: 10,
  },
  {
    code: "document_configuration_management",
    name: "Document Configuration Management",
    description: "Manage document categories and document types",
    sortOrder: 11,
  },
  {
    code: "uom_management",
    name: "UOM Management",
    description: "Manage units of measure and global conversions",
    sortOrder: 12,
  },
  {
    code: "product_attribute_management",
    name: "Product Attribute Management",
    description: "Manage product types, groups, categories, and products",
    sortOrder: 13,
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
    code: "manage_sso_provider",
    name: "Manage SSO Provider",
    description: "Manage SSO identity providers",
    moduleCode: "sso_management",
  },
  {
    code: "manage_sso_user",
    name: "Manage SSO User",
    description: "Manage SSO user links",
    moduleCode: "sso_management",
  },
  {
    code: "manage_system_setting",
    name: "Manage System Setting",
    description: "Manage system-wide settings",
    moduleCode: "system_management",
  },
  {
    code: "manage_security",
    name: "Manage Security",
    description: "Manage sessions, two-factor auth, API keys, and audit logs",
    moduleCode: "security_management",
  },
  {
    code: "manage_company",
    name: "Manage Company",
    description: "Create, update, and remove companies",
    moduleCode: "organization_management",
  },
  {
    code: "manage_organizational_unit",
    name: "Manage Organizational Unit",
    description: "Create, update, and remove organizational units",
    moduleCode: "organization_management",
  },
  {
    code: "manage_logistic_unit",
    name: "Manage Logistic Unit",
    description: "Create, update, and remove logistic units",
    moduleCode: "organization_management",
  },
  {
    code: "manage_purchasing_group",
    name: "Manage Purchasing Group",
    description: "Create, update, and remove purchasing groups",
    moduleCode: "organization_management",
  },
  {
    code: "manage_country",
    name: "Manage Country",
    description: "Create, update, and remove countries",
    moduleCode: "address_management",
  },
  {
    code: "manage_province",
    name: "Manage Province",
    description: "Create, update, and remove provinces",
    moduleCode: "address_management",
  },
  {
    code: "manage_district",
    name: "Manage District",
    description: "Create, update, and remove districts",
    moduleCode: "address_management",
  },
  {
    code: "manage_document_category",
    name: "Manage Document Category",
    description: "Create, update, and remove document categories",
    moduleCode: "document_configuration_management",
  },
  {
    code: "manage_document_type",
    name: "Manage Document Type",
    description: "Create, update, and remove document types",
    moduleCode: "document_configuration_management",
  },
  {
    code: "manage_uom",
    name: "Manage UOM",
    description: "Create, update, and remove units of measure",
    moduleCode: "uom_management",
  },
  {
    code: "manage_uom_global_conversion",
    name: "Manage UOM Global Conversion",
    description: "Create, update, and remove global UOM conversions",
    moduleCode: "uom_management",
  },
  {
    code: "manage_product_type",
    name: "Manage Product Type",
    description: "Create, update, and remove product types",
    moduleCode: "product_attribute_management",
  },
  {
    code: "manage_product_group",
    name: "Manage Product Group",
    description: "Create, update, and remove product groups",
    moduleCode: "product_attribute_management",
  },
  {
    code: "manage_product_category",
    name: "Manage Product Category",
    description: "Create, update, and remove product categories",
    moduleCode: "product_attribute_management",
  },
  {
    code: "manage_product",
    name: "Manage Product",
    description: "Create, update, and remove products",
    moduleCode: "product_attribute_management",
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

export const menus: MenuSeed[] = [
  {
    code: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: "LayoutDashboard",
    parentCode: null,
    sortOrder: 1,
  },
  {
    code: "settings",
    label: "Account Settings",
    path: "/dashboard/settings",
    icon: "Settings",
    parentCode: null,
    sortOrder: 2,
  },
  {
    code: "admin",
    label: "Administration",
    path: null,
    icon: "Shield",
    parentCode: null,
    sortOrder: 3,
  },
  {
    code: "user_management",
    label: "User Management",
    path: null,
    icon: "Users",
    parentCode: "admin",
    sortOrder: 1,
  },
  {
    code: "users",
    label: "Users",
    path: "/dashboard/admin-page/user-management/users",
    icon: "Users",
    parentCode: "user_management",
    sortOrder: 1,
  },
  {
    code: "roles",
    label: "Roles",
    path: "/dashboard/admin-page/user-management/roles",
    icon: "ShieldCheck",
    parentCode: "user_management",
    sortOrder: 2,
  },
  {
    code: "permissions",
    label: "Permissions",
    path: "/dashboard/admin-page/user-management/permissions",
    icon: "Lock",
    parentCode: "user_management",
    sortOrder: 3,
  },
  {
    code: "permission_modules",
    label: "Permission Modules",
    path: "/dashboard/admin-page/user-management/permission-modules",
    icon: "Layers",
    parentCode: "user_management",
    sortOrder: 4,
  },
  {
    code: "login_history",
    label: "Login History",
    path: "/dashboard/admin-page/user-management/login-history",
    icon: "History",
    parentCode: "user_management",
    sortOrder: 5,
  },
  {
    code: "menus",
    label: "Menus",
    path: "/dashboard/admin-page/menus",
    icon: "Menu",
    parentCode: "admin",
    sortOrder: 2,
  },
  {
    code: "security",
    label: "Security",
    path: null,
    icon: "Shield",
    parentCode: "admin",
    sortOrder: 3,
  },
  {
    code: "sessions",
    label: "Sessions",
    path: "/dashboard/admin-page/security/sessions",
    icon: "MonitorSmartphone",
    parentCode: "security",
    sortOrder: 1,
  },
  {
    code: "two_factor",
    label: "Two Factor",
    path: "/dashboard/admin-page/security/two-factor",
    icon: "ShieldCheck",
    parentCode: "security",
    sortOrder: 2,
  },
  {
    code: "api_keys",
    label: "API Keys",
    path: "/dashboard/admin-page/security/api-keys",
    icon: "Key",
    parentCode: "security",
    sortOrder: 3,
  },
  {
    code: "audit_logs",
    label: "Audit Logs",
    path: "/dashboard/admin-page/security/audit-logs",
    icon: "ScrollText",
    parentCode: "security",
    sortOrder: 4,
  },
  {
    code: "email",
    label: "Email",
    path: null,
    icon: "Mail",
    parentCode: "admin",
    sortOrder: 4,
  },
  {
    code: "email_settings",
    label: "Email Settings",
    path: "/dashboard/admin-page/email/settings",
    icon: "Settings",
    parentCode: "email",
    sortOrder: 1,
  },
  {
    code: "email_templates",
    label: "Email Templates",
    path: "/dashboard/admin-page/email/templates",
    icon: "FileText",
    parentCode: "email",
    sortOrder: 2,
  },
  {
    code: "email_logs",
    label: "Email Logs",
    path: "/dashboard/admin-page/email/logs",
    icon: "History",
    parentCode: "email",
    sortOrder: 3,
  },
  {
    code: "integration",
    label: "Integration",
    path: null,
    icon: "Link",
    parentCode: "admin",
    sortOrder: 5,
  },
  {
    code: "webhooks",
    label: "Webhooks",
    path: "/dashboard/admin-page/integration/webhooks",
    icon: "Webhook",
    parentCode: "integration",
    sortOrder: 1,
  },
  {
    code: "webhook_logs",
    label: "Webhook Logs",
    path: "/dashboard/admin-page/integration/webhook-logs",
    icon: "History",
    parentCode: "integration",
    sortOrder: 2,
  },
  {
    code: "sso_providers",
    label: "SSO Providers",
    path: "/dashboard/admin-page/integration/sso-providers",
    icon: "Shield",
    parentCode: "integration",
    sortOrder: 3,
  },
  {
    code: "sso_users",
    label: "SSO Users",
    path: "/dashboard/admin-page/integration/sso-users",
    icon: "Users",
    parentCode: "integration",
    sortOrder: 4,
  },
  {
    code: "organization",
    label: "Organization",
    path: null,
    icon: "Building2",
    parentCode: "admin",
    sortOrder: 6,
  },
  {
    code: "companies",
    label: "Companies",
    path: "/dashboard/admin-page/organization/companies",
    icon: "Building",
    parentCode: "organization",
    sortOrder: 1,
  },
  {
    code: "organizational_units",
    label: "Organizational Units",
    path: "/dashboard/admin-page/organization/organizational_units",
    icon: "Network",
    parentCode: "organization",
    sortOrder: 2,
  },
  {
    code: "logistic_units",
    label: "Logistic Units",
    path: "/dashboard/admin-page/organization/logistic_units",
    icon: "Truck",
    parentCode: "organization",
    sortOrder: 3,
  },
  {
    code: "purchasing_groups",
    label: "Purchasing Groups",
    path: "/dashboard/admin-page/organization/purchasing_groups",
    icon: "ShoppingCart",
    parentCode: "organization",
    sortOrder: 4,
  },
  {
    code: "address",
    label: "Address",
    path: null,
    icon: "MapPin",
    parentCode: "admin",
    sortOrder: 7,
  },
  {
    code: "countries",
    label: "Countries",
    path: "/dashboard/admin-page/address/countries",
    icon: "Globe",
    parentCode: "address",
    sortOrder: 1,
  },
  {
    code: "provinces",
    label: "Provinces",
    path: "/dashboard/admin-page/address/provinces",
    icon: "Map",
    parentCode: "address",
    sortOrder: 2,
  },
  {
    code: "districts",
    label: "Districts",
    path: "/dashboard/admin-page/address/districts",
    icon: "MapPinned",
    parentCode: "address",
    sortOrder: 3,
  },
  {
    code: "document_configuration",
    label: "Document Configuration",
    path: null,
    icon: "FileText",
    parentCode: "admin",
    sortOrder: 8,
  },
  {
    code: "document_categories",
    label: "Document Categories",
    path: "/dashboard/admin-page/document-configuration/document-categories",
    icon: "FolderTree",
    parentCode: "document_configuration",
    sortOrder: 1,
  },
  {
    code: "document_types",
    label: "Document Types",
    path: "/dashboard/admin-page/document-configuration/document-types",
    icon: "FileType",
    parentCode: "document_configuration",
    sortOrder: 2,
  },
  {
    code: "uom",
    label: "UOM",
    path: null,
    icon: "Ruler",
    parentCode: "admin",
    sortOrder: 9,
  },
  {
    code: "uoms",
    label: "UOMs",
    path: "/dashboard/admin-page/uom/uoms",
    icon: "Scale",
    parentCode: "uom",
    sortOrder: 1,
  },
  {
    code: "uom_global_conversions",
    label: "Global Conversions",
    path: "/dashboard/admin-page/uom/uom-global-conversions",
    icon: "ArrowLeftRight",
    parentCode: "uom",
    sortOrder: 2,
  },
  {
    code: "product_attribute",
    label: "Product Attribute",
    path: null,
    icon: "Package",
    parentCode: "admin",
    sortOrder: 10,
  },
  {
    code: "product_types",
    label: "Product Types",
    path: "/dashboard/admin-page/product-attribute/product-types",
    icon: "Tags",
    parentCode: "product_attribute",
    sortOrder: 1,
  },
  {
    code: "product_groups",
    label: "Product Groups",
    path: "/dashboard/admin-page/product-attribute/product-groups",
    icon: "Layers",
    parentCode: "product_attribute",
    sortOrder: 2,
  },
  {
    code: "product_categories",
    label: "Product Categories",
    path: "/dashboard/admin-page/product-attribute/product-categories",
    icon: "FolderTree",
    parentCode: "product_attribute",
    sortOrder: 3,
  },
  {
    code: "products",
    label: "Products",
    path: "/dashboard/admin-page/product-attribute/products",
    icon: "Box",
    parentCode: "product_attribute",
    sortOrder: 4,
  },
];

const allMenuCodes = menus.map((menu) => menu.code);

const menuGroupCodes = new Set([
  "admin",
  "user_management",
  "email",
  "security",
  "integration",
  "organization",
  "address",
  "document_configuration",
  "uom",
  "product_attribute",
]);
const userNavMenuCodes = new Set(["dashboard", "settings"]);

const adminFullCrudMenuCodes = allMenuCodes.filter(
  (code) => !menuGroupCodes.has(code) && !userNavMenuCodes.has(code),
);

const adminExcludedMenuCodes = new Set(["permissions"]);

function buildRoleMenuAssignments(
  roleCode: string,
  menuCodes: string[],
): RoleMenuSeed[] {
  return menuCodes.map((menuCode) => {
    const isFullCrud = adminFullCrudMenuCodes.includes(menuCode);

    return {
      roleCode,
      menuCode,
      canView: true,
      canCreate: isFullCrud,
      canEdit: isFullCrud,
      canDelete: isFullCrud,
    };
  });
}

export const roleMenus: RoleMenuSeed[] = [
  ...buildRoleMenuAssignments("super_admin", allMenuCodes),
  ...buildRoleMenuAssignments(
    "admin",
    allMenuCodes.filter((code) => !adminExcludedMenuCodes.has(code)),
  ),
  ...buildRoleMenuAssignments("user", ["dashboard", "settings"]).map(
    (assignment) => ({
      ...assignment,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    }),
  ),
];
