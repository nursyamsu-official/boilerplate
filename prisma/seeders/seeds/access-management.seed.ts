// import { prisma } from "../lib/prisma";
import { prisma } from "@/lib/prisma";
import {
  menus,
  modules,
  permissions,
  roleMenus,
  rolePermissions,
  roles,
} from "../data/access-management";

export async function seedAccessManagement() {
  for (const role of roles) {
    await prisma.role.upsert({
      where: { code: role.code },
      update: {},
      create: {
        code: role.code,
        name: role.name,
        description: role.description,
        isSystem: true,
        isActive: true,
      },
    });
  }

  const moduleIdByCode = new Map<string, string>();
  for (const module of modules) {
    const record = await prisma.permissionModule.upsert({
      where: { code: module.code },
      update: {},
      create: {
        code: module.code,
        name: module.name,
        description: module.description,
        sortOrder: module.sortOrder,
        isSystem: true,
        isActive: true,
      },
    });
    moduleIdByCode.set(module.code, record.id);
  }

  for (const permission of permissions) {
    const moduleId = moduleIdByCode.get(permission.moduleCode) ?? null;
    await prisma.permission.upsert({
      where: { code: permission.code },
      update: {},
      create: {
        code: permission.code,
        name: permission.name,
        description: permission.description,
        moduleId,
        isSystem: true,
      },
    });
  }

  const roleIdByCode = new Map(
    (await prisma.role.findMany({ select: { id: true, code: true } })).map(
      (role) => [role.code, role.id] as const,
    ),
  );
  const permissionIdByCode = new Map(
    (
      await prisma.permission.findMany({ select: { id: true, code: true } })
    ).map((permission) => [permission.code, permission.id] as const),
  );

  let rolePermissionCount = 0;
  for (const assignment of rolePermissions) {
    const roleId = roleIdByCode.get(assignment.roleCode);
    if (!roleId) continue;

    for (const permissionCode of assignment.permissionCodes) {
      const permissionId = permissionIdByCode.get(permissionCode);
      if (!permissionId) continue;

      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId, permissionId } },
        update: { granted: true },
        create: { roleId, permissionId, granted: true },
      });
      rolePermissionCount += 1;
    }
  }

  const menuIdByCode = new Map<string, string>();
  for (const menu of menus) {
    const parentId = menu.parentCode
      ? (menuIdByCode.get(menu.parentCode) ?? null)
      : null;

    if (menu.parentCode && !parentId) {
      throw new Error(`Missing parent menu for code: ${menu.code}`);
    }

    const record = await prisma.menu.upsert({
      where: { code: menu.code },
      update: {},
      create: {
        code: menu.code,
        label: menu.label,
        path: menu.path,
        icon: menu.icon,
        parentId,
        sortOrder: menu.sortOrder,
        isActive: true,
      },
    });
    menuIdByCode.set(menu.code, record.id);
  }

  let roleMenuCount = 0;
  for (const assignment of roleMenus) {
    const roleId = roleIdByCode.get(assignment.roleCode);
    const menuId = menuIdByCode.get(assignment.menuCode);
    if (!roleId || !menuId) continue;

    await prisma.roleMenu.upsert({
      where: { roleId_menuId: { roleId, menuId } },
      update: {
        canView: assignment.canView,
        canCreate: assignment.canCreate,
        canEdit: assignment.canEdit,
        canDelete: assignment.canDelete,
      },
      create: {
        roleId,
        menuId,
        canView: assignment.canView,
        canCreate: assignment.canCreate,
        canEdit: assignment.canEdit,
        canDelete: assignment.canDelete,
      },
    });
    roleMenuCount += 1;
  }

  console.log("Access management seed complete:");
  console.log(`  roles:            ${roles.length}`);
  console.log(`  modules:          ${modules.length}`);
  console.log(`  permissions:      ${permissions.length}`);
  console.log(`  role-permissions: ${rolePermissionCount}`);
  console.log(`  menus:            ${menus.length}`);
  console.log(`  role-menus:       ${roleMenuCount}`);
}
