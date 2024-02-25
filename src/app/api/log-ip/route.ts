import { db } from "@/lib/db";
import getSignedInUser from "@/lib/fetchers/getSignedInUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getSignedInUser({ select: { id: true, ips: true } });
  if (!user) return NextResponse.json({ ok: true });

  const existingIps = user.ips.map((ip) => ip.ip);
  if (req.ip && !existingIps.includes(req.ip)) {
    await db.user.update({
      where: { id: user.id },
      data: { ips: { create: { ip: req.ip } } },
    });
  }

  return NextResponse.json({ ok: true });
}
