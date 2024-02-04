import myTestGetTestResults from "@/lib/fetchers/myTest/getTestResults";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params: { testId } }: { params: { testId: string } },
) {
  const data = await myTestGetTestResults({ testId });
  return NextResponse.json(data);
}

export const dynamic = "force-dynamic";
