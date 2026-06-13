import { prisma } from "@/lib/prisma";

import type {
  ApiKeyListFilters,
  ApiKeyListResult,
} from "../types/api-key.type";

function buildStatusWhere(status: ApiKeyListFilters["status"]) {
  const now = new Date();

  if (status === "active") {
    return {
      isActive: true,
      revokedAt: null,
      OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
    };
  }

  if (status === "inactive") {
    return { isActive: false, revokedAt: null };
  }

  if (status === "revoked") {
    return { revokedAt: { not: null } };
  }

  if (status === "expired") {
    return {
      revokedAt: null,
      expiresAt: { lte: now },
    };
  }

  return {};
}

export async function apiKeyListRepository(
  filters: ApiKeyListFilters,
): Promise<ApiKeyListResult> {
  const search = filters.search.trim();
  const skip = (filters.page - 1) * filters.pageSize;

  const where = {
    ...buildStatusWhere(filters.status),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { prefix: { contains: search, mode: "insensitive" as const } },
            {
              user: {
                OR: [
                  { email: { contains: search, mode: "insensitive" as const } },
                  { name: { contains: search, mode: "insensitive" as const } },
                ],
              },
            },
          ],
        }
      : {}),
  };

  const [rows, total] = await Promise.all([
    prisma.apiKey.findMany({
      where,
      select: {
        id: true,
        userId: true,
        name: true,
        description: true,
        prefix: true,
        scopes: true,
        isActive: true,
        lastUsedAt: true,
        lastUsedIp: true,
        expiresAt: true,
        revokedAt: true,
        revokedBy: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.apiKey.count({ where }),
  ]);

  return {
    items: rows,
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}

export async function apiKeyGetByIdRepository(id: string) {
  return prisma.apiKey.findUnique({
    where: { id },
    select: {
      id: true,
      userId: true,
      name: true,
      description: true,
      prefix: true,
      scopes: true,
      isActive: true,
      lastUsedAt: true,
      lastUsedIp: true,
      expiresAt: true,
      revokedAt: true,
      revokedBy: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

type ApiKeyCreateRepositoryInput = {
  userId: string;
  name: string;
  description: string | null;
  prefix: string;
  hashedKey: string;
  scopes: string | null;
  expiresAt: Date | null;
};

export async function apiKeyCreateRepository(input: ApiKeyCreateRepositoryInput) {
  return prisma.apiKey.create({
    data: input,
    select: {
      id: true,
      userId: true,
      name: true,
      description: true,
      prefix: true,
      scopes: true,
      isActive: true,
      lastUsedAt: true,
      lastUsedIp: true,
      expiresAt: true,
      revokedAt: true,
      revokedBy: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

type ApiKeyUpdateRepositoryInput = {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  scopes: string | null;
  expiresAt: Date | null;
  isActive: boolean;
};

export async function apiKeyUpdateRepository(input: ApiKeyUpdateRepositoryInput) {
  return prisma.apiKey.update({
    where: { id: input.id },
    data: {
      userId: input.userId,
      name: input.name,
      description: input.description,
      scopes: input.scopes,
      expiresAt: input.expiresAt,
      isActive: input.isActive,
    },
    select: {
      id: true,
      userId: true,
      name: true,
      description: true,
      prefix: true,
      scopes: true,
      isActive: true,
      lastUsedAt: true,
      lastUsedIp: true,
      expiresAt: true,
      revokedAt: true,
      revokedBy: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function apiKeyRevokeRepository(id: string, revokedBy: string) {
  return prisma.apiKey.update({
    where: { id },
    data: {
      isActive: false,
      revokedAt: new Date(),
      revokedBy,
    },
    select: {
      id: true,
      userId: true,
      name: true,
      prefix: true,
      isActive: true,
      revokedAt: true,
    },
  });
}

export async function apiKeyDeleteRepository(id: string) {
  return prisma.apiKey.delete({
    where: { id },
    select: {
      id: true,
      name: true,
      prefix: true,
      userId: true,
    },
  });
}
