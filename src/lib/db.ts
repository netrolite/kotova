import { PrismaClient } from "@prisma/client";
import isProduction from "./isProduction";

// eslint-disable-next-line
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// prevents having too many open connections in the connection pool
// in development due to hot reloading
export const db = globalForPrisma.prisma || new PrismaClient();

if (!isProduction()) globalForPrisma.prisma = db;
