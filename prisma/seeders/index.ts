// import { prisma } from "./lib/prisma";
import { prisma } from "@/lib/prisma";
import { seedAccessManagement } from "./seeds/access-management.seed";
import { seedAddress } from "./seeds/address.seed";
import { seedDocumentConfiguration } from "./seeds/document-configuration.seed";
import { seedEmail } from "./seeds/email.seed";
import { seedOrganization } from "./seeds/organization.seed";
import { seedProductAttribute } from "./seeds/product-attribute.seed";
import { seedEvaluation } from "./seeds/evaluation.seed";
import { seedUom } from "./seeds/uom.seed";

async function main() {
  await seedAccessManagement();
  await seedOrganization();
  await seedAddress();
  await seedDocumentConfiguration();
  await seedUom();
  await seedProductAttribute();
  await seedEvaluation();
  await seedEmail();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
