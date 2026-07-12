// import { prisma } from "./lib/prisma";
import { prisma } from "@/lib/prisma";
import { seedAccessManagement } from "./seeds/access-management.seed";
import { seedEmail } from "./seeds/email.seed";
import { seedOrganization } from "./seeds/organization.seed";

async function main() {
  await seedAccessManagement();
  await seedOrganization();
  await seedEmail();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
