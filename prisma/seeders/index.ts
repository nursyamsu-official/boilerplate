// import { prisma } from "./lib/prisma";
import { prisma } from "@/lib/prisma";
import { seedAccessManagement } from "./seeds/access-management.seed";

async function main() {
  await seedAccessManagement();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
