import { db } from "@/lib/db";
import getSignedInUser from "@/lib/fetchers/getSignedInUser";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getSignedInUser({ select: { id: true, ips: true } });
  if (!user) return NextResponse.json({ ok: true });

  const currIp = (
    (await headers()).get("x-forwarded-for") ?? "127.0.0.1"
  ).split(",")[0];
  const existingIps = user.ips.map((ip) => ip.ip);
  if (currIp && !existingIps.includes(currIp)) {
    await db.ip.create({
      data: { ip: currIp, user: { connect: { id: user.id } } },
    });
  }

  return NextResponse.json({ ok: true });
}
