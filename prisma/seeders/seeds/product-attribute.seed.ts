import { prisma } from "@/lib/prisma";

import {
  productCategories,
  productGroups,
  productTypes,
  products,
} from "../data/product-attribute";

export async function seedProductAttribute() {
  const typeIdByCode = new Map<string, string>();
  const groupIdByCode = new Map<string, string>();
  const categoryIdByGroupAndCode = new Map<string, string>();
  const uomIdByCode = new Map<string, string>();

  const uomRecords = await prisma.uom.findMany({
    select: { id: true, code: true },
  });
  for (const uom of uomRecords) {
    uomIdByCode.set(uom.code, uom.id);
  }

  for (const productType of productTypes) {
    const record = await prisma.productType.upsert({
      where: { code: productType.code },
      update: {
        name: productType.name,
        description: productType.description,
        isActive: true,
      },
      create: {
        code: productType.code,
        name: productType.name,
        description: productType.description,
        isActive: true,
      },
      select: { id: true, code: true },
    });
    typeIdByCode.set(productType.code, record.id);
  }

  for (const productGroup of productGroups) {
    const record = await prisma.productGroup.upsert({
      where: { code: productGroup.code },
      update: {
        name: productGroup.name,
        description: productGroup.description,
        isActive: true,
      },
      create: {
        code: productGroup.code,
        name: productGroup.name,
        description: productGroup.description,
        isActive: true,
      },
      select: { id: true, code: true },
    });
    groupIdByCode.set(productGroup.code, record.id);
  }

  for (const productCategory of productCategories) {
    const groupId = groupIdByCode.get(productCategory.groupCode);
    if (!groupId) {
      throw new Error(
        `Missing product group for category ${productCategory.code}: ${productCategory.groupCode}`,
      );
    }

    const record = await prisma.productCategory.upsert({
      where: {
        groupId_code: {
          groupId,
          code: productCategory.code,
        },
      },
      update: {
        name: productCategory.name,
        description: productCategory.description,
        isActive: true,
      },
      create: {
        groupId,
        code: productCategory.code,
        name: productCategory.name,
        description: productCategory.description,
        isActive: true,
      },
      select: { id: true, code: true, groupId: true },
    });

    categoryIdByGroupAndCode.set(
      `${productCategory.groupCode}:${productCategory.code}`,
      record.id,
    );
  }

  for (const product of products) {
    const productTypeId = typeIdByCode.get(product.typeCode);
    const productGroupId = groupIdByCode.get(product.groupCode);
    const productCategoryId = categoryIdByGroupAndCode.get(
      `${product.groupCode}:${product.categoryCode}`,
    );

    if (!productTypeId) {
      throw new Error(`Missing product type for product ${product.code}: ${product.typeCode}`);
    }
    if (!productGroupId) {
      throw new Error(`Missing product group for product ${product.code}: ${product.groupCode}`);
    }
    if (!productCategoryId) {
      throw new Error(
        `Missing product category for product ${product.code}: ${product.groupCode}/${product.categoryCode}`,
      );
    }

    const baseUomId = product.baseUomCode
      ? uomIdByCode.get(product.baseUomCode) ?? null
      : null;

    if (product.baseUomCode && !baseUomId) {
      throw new Error(
        `Missing UOM for product ${product.code}: ${product.baseUomCode}`,
      );
    }

    await prisma.product.upsert({
      where: { code: product.code },
      update: {
        name: product.name,
        description: product.description,
        productTypeId,
        productGroupId,
        productCategoryId,
        baseUomId,
        isActive: true,
      },
      create: {
        code: product.code,
        name: product.name,
        description: product.description,
        productTypeId,
        productGroupId,
        productCategoryId,
        baseUomId,
        isActive: true,
      },
    });
  }

  console.log("Product attribute seed complete:");
  console.log(`  product types:      ${productTypes.length}`);
  console.log(`  product groups:     ${productGroups.length}`);
  console.log(`  product categories: ${productCategories.length}`);
  console.log(`  products:           ${products.length}`);
}
