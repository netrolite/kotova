import getUsers from "@/lib/fetchers/allUsers/getUsers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get("q") ?? undefined;
  const users = await getUsers({ query });
  return NextResponse.json(users);
}

export const dynamic = "force-dynamic";
