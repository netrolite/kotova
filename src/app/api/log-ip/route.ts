import { db } from "@/lib/db";
import getSignedInUser from "@/lib/fetchers/getSignedInUser";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import requestIp from "request-ip";

export async function GET(req: NextApiRequest) {
  const user = await getSignedInUser({ select: { id: true, ips: true } });
  if (!user) return NextResponse.json({ ok: true });

  const currIp = requestIp.getClientIp(req);
  const existingIps = user.ips.map((ip) => ip.ip);
  if (currIp && !existingIps.includes(currIp)) {
    await db.ip.create({
      data: { ip: currIp, user: { connect: { id: user.id } } },
    });
  }

  return NextResponse.json({ ok: true });
}
