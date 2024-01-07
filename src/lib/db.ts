import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import isProduction from "./isProduction";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// prevents having too many open connections in the connection pool
// in development due to hot reloading
export const db =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (!isProduction()) globalForPrisma.prisma = db;
