import { prisma } from "@/lib/prisma";

import { countries, districts, provinces } from "../data/address";

export async function seedAddress() {
  const countryIdByCode = new Map<string, string>();

  for (const country of countries) {
    const record = await prisma.country.upsert({
      where: { code: country.code },
      update: {
        name: country.name,
        description: country.description,
        isActive: true,
      },
      create: {
        code: country.code,
        name: country.name,
        description: country.description,
        isActive: true,
      },
    });
    countryIdByCode.set(country.code, record.id);
  }

  const provinceIdByKey = new Map<string, string>();

  for (const province of provinces) {
    const countryId = countryIdByCode.get(province.countryCode);
    if (!countryId) {
      throw new Error(`Missing country for province: ${province.code}`);
    }

    const record = await prisma.province.upsert({
      where: {
        countryId_code: {
          countryId,
          code: province.code,
        },
      },
      update: {
        name: province.name,
        description: province.description,
        isActive: true,
      },
      create: {
        countryId,
        code: province.code,
        name: province.name,
        description: province.description,
        isActive: true,
      },
    });

    provinceIdByKey.set(
      `${province.countryCode}:${province.code}`,
      record.id,
    );
  }

  for (const district of districts) {
    const provinceId = provinceIdByKey.get(
      `${district.countryCode}:${district.provinceCode}`,
    );
    if (!provinceId) {
      throw new Error(`Missing province for district: ${district.code}`);
    }

    await prisma.district.upsert({
      where: {
        provinceId_code: {
          provinceId,
          code: district.code,
        },
      },
      update: {
        name: district.name,
        description: district.description,
        isActive: true,
      },
      create: {
        provinceId,
        code: district.code,
        name: district.name,
        description: district.description,
        isActive: true,
      },
    });
  }

  console.log("Address seed complete:");
  console.log(`  countries:  ${countries.length}`);
  console.log(`  provinces:  ${provinces.length}`);
  console.log(`  districts:  ${districts.length}`);
}
