import { prisma } from "@/lib/prisma";

export async function menuActivePathsRepository(): Promise<string[]> {
  const menus = await prisma.menu.findMany({
    where: {
      isActive: true,
      path: { not: null },
    },
    select: {
      path: true,
    },
    orderBy: [{ sortOrder: "asc" }, { label: "asc" }],
  });

  return menus
    .map((menu) => menu.path)
    .filter((path): path is string => path !== null);
}
