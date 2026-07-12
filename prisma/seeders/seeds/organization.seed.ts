import { prisma } from "@/lib/prisma";

import { companies, logisticUnits, organizationalUnits, purchasingGroups } from "../data/organization";

export async function seedOrganization() {
  const companyIdByCode = new Map<string, string>();

  for (const company of companies) {
    const record = await prisma.company.upsert({
      where: { code: company.code },
      update: {
        name: company.name,
        description: company.description,
        isActive: true,
      },
      create: {
        code: company.code,
        name: company.name,
        description: company.description,
        isActive: true,
      },
    });
    companyIdByCode.set(company.code, record.id);
  }

  const unitIdByKey = new Map<string, string>();

  for (const unit of organizationalUnits) {
    const companyId = companyIdByCode.get(unit.companyCode);
    if (!companyId) {
      throw new Error(`Missing company for organizational unit: ${unit.code}`);
    }

    const parentId = unit.parentCode
      ? (unitIdByKey.get(`${unit.companyCode}:${unit.parentCode}`) ?? null)
      : null;

    if (unit.parentCode && !parentId) {
      throw new Error(`Missing parent unit for code: ${unit.code}`);
    }

    const record = await prisma.organizationalUnit.upsert({
      where: {
        companyId_code: {
          companyId,
          code: unit.code,
        },
      },
      update: {
        name: unit.name,
        description: unit.description,
        parentId,
        sortOrder: unit.sortOrder,
        isActive: true,
      },
      create: {
        companyId,
        code: unit.code,
        name: unit.name,
        description: unit.description,
        parentId,
        sortOrder: unit.sortOrder,
        isActive: true,
      },
    });

    unitIdByKey.set(`${unit.companyCode}:${unit.code}`, record.id);
  }

  const logisticUnitIdByKey = new Map<string, string>();

  for (const unit of logisticUnits) {
    const companyId = companyIdByCode.get(unit.companyCode);
    if (!companyId) {
      throw new Error(`Missing company for logistic unit: ${unit.code}`);
    }

    const parentId = unit.parentCode
      ? (logisticUnitIdByKey.get(`${unit.companyCode}:${unit.parentCode}`) ??
        null)
      : null;

    if (unit.parentCode && !parentId) {
      throw new Error(`Missing parent unit for code: ${unit.code}`);
    }

    const record = await prisma.logisticUnit.upsert({
      where: {
        companyId_code: {
          companyId,
          code: unit.code,
        },
      },
      update: {
        name: unit.name,
        description: unit.description,
        parentId,
        sortOrder: unit.sortOrder,
        isActive: true,
      },
      create: {
        companyId,
        code: unit.code,
        name: unit.name,
        description: unit.description,
        parentId,
        sortOrder: unit.sortOrder,
        isActive: true,
      },
    });

    logisticUnitIdByKey.set(`${unit.companyCode}:${unit.code}`, record.id);
  }

  const purchasingGroupIdByKey = new Map<string, string>();

  for (const group of purchasingGroups) {
    const companyId = companyIdByCode.get(group.companyCode);
    if (!companyId) {
      throw new Error(`Missing company for purchasing group: ${group.code}`);
    }

    const parentId = group.parentCode
      ? (purchasingGroupIdByKey.get(`${group.companyCode}:${group.parentCode}`) ??
        null)
      : null;

    if (group.parentCode && !parentId) {
      throw new Error(`Missing parent group for code: ${group.code}`);
    }

    const record = await prisma.purchasingGroup.upsert({
      where: {
        companyId_code: {
          companyId,
          code: group.code,
        },
      },
      update: {
        name: group.name,
        description: group.description,
        parentId,
        sortOrder: group.sortOrder,
        isActive: true,
      },
      create: {
        companyId,
        code: group.code,
        name: group.name,
        description: group.description,
        parentId,
        sortOrder: group.sortOrder,
        isActive: true,
      },
    });

    purchasingGroupIdByKey.set(`${group.companyCode}:${group.code}`, record.id);
  }

  console.log("Organization seed complete:");
  console.log(`  companies:             ${companies.length}`);
  console.log(`  organizational units:  ${organizationalUnits.length}`);
  console.log(`  logistic units:        ${logisticUnits.length}`);
  console.log(`  purchasing groups:     ${purchasingGroups.length}`);
}
