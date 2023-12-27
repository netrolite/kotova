import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import getEnvVar from "./getEnvVar";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const libsql = createClient({
  url: getEnvVar("DB_URL"),
  authToken: getEnvVar("DB_AUTH_TOKEN"),
});
const adapter = new PrismaLibSQL(libsql);

// prevents having too many open connections in the connection pool
// in development due to hot reloading
export const db = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
