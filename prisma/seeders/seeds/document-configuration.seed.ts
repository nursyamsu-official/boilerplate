import { prisma } from "@/lib/prisma";

import {
  documentCategories,
  documentTypes,
} from "../data/document-configuration";

export async function seedDocumentConfiguration() {
  const categoryIdByCode = new Map<string, string>();

  for (const category of documentCategories) {
    const record = await prisma.documentCategory.upsert({
      where: { code: category.code },
      update: {
        name: category.name,
        description: category.description,
        isActive: true,
      },
      create: {
        code: category.code,
        name: category.name,
        description: category.description,
        isActive: true,
      },
      select: { id: true, code: true },
    });

    categoryIdByCode.set(category.code, record.id);
  }

  for (const documentType of documentTypes) {
    const categoryId = categoryIdByCode.get(documentType.categoryCode);
    if (!categoryId) {
      throw new Error(
        `Missing document category for type ${documentType.code}: ${documentType.categoryCode}`,
      );
    }

    await prisma.documentType.upsert({
      where: {
        categoryId_code: {
          categoryId,
          code: documentType.code,
        },
      },
      update: {
        name: documentType.name,
        description: documentType.description,
        numberPrefix: documentType.numberPrefix,
        numberSeparator: documentType.numberSeparator ?? "/",
        numberStart: documentType.numberStart,
        numberEnd: documentType.numberEnd,
        numberCurrent: documentType.numberCurrent,
        numberPadding: documentType.numberPadding ?? 5,
        isActive: true,
      },
      create: {
        categoryId,
        code: documentType.code,
        name: documentType.name,
        description: documentType.description,
        numberPrefix: documentType.numberPrefix,
        numberSeparator: documentType.numberSeparator ?? "/",
        numberStart: documentType.numberStart,
        numberEnd: documentType.numberEnd,
        numberCurrent: documentType.numberCurrent,
        numberPadding: documentType.numberPadding ?? 5,
        isActive: true,
      },
    });
  }

  console.log(
    `Seeded ${documentCategories.length} document categories and ${documentTypes.length} document types`,
  );
}
