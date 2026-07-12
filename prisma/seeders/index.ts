// import { prisma } from "./lib/prisma";
import { prisma } from "@/lib/prisma";
import { seedAccessManagement } from "./seeds/access-management.seed";
import { seedAddress } from "./seeds/address.seed";
import { seedDocumentConfiguration } from "./seeds/document-configuration.seed";
import { seedEmail } from "./seeds/email.seed";
import { seedOrganization } from "./seeds/organization.seed";

async function main() {
  await seedAccessManagement();
  await seedOrganization();
  await seedAddress();
  await seedDocumentConfiguration();
  await seedEmail();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
