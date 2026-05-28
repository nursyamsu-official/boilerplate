You can copy-paste this directly into a `.md` file:

# Prisma Seed Flow

| Source             | Step                                                 |
| ------------------ | ---------------------------------------------------- |
| `package.json`     | Run command: `pnpm db:seed`                          |
| `package.json`     | Internally execute: `prisma db seed`                 |
| `prisma.config.ts` | Read and run: `pnpm dlx tsx prisma/seeders/index.ts` |

## Example Flow

```bash
pnpm db:seed
  ↓
prisma db seed
  ↓
prisma.config.ts
  ↓
pnpm dlx tsx prisma/seeders/index.ts
```
