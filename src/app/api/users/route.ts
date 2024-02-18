import getUsers from "@/lib/fetchers/allUsers/getUsers";
import parseSearchParamNumber from "@/lib/parseSearchParamNumber";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get("q") ?? undefined;
  const page = parseSearchParamNumber(searchParams.get("page")) ?? 0;
  const users = await getUsers({ query, page });
  return NextResponse.json(users);
}

export const dynamic = "force-dynamic";
