import { prisma } from "@/lib/prisma";

import { companies, organizationalUnits } from "../data/organization";

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

  console.log("Organization seed complete:");
  console.log(`  companies:             ${companies.length}`);
  console.log(`  organizational units:  ${organizationalUnits.length}`);
}
