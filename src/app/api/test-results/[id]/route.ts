import myTestGetTestResults from "@/lib/fetchers/myTest/getTestResults";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { testId: string };
};

type SearchParams = {
  q?: string;
  scoreMin?: string;
  scoreMax?: string;
};

export async function GET(req: NextRequest, { params: { testId } }: Context) {
  const {
    q,
    scoreMin: rawScoreMin,
    scoreMax: rawScoreMax,
  }: SearchParams = Object.fromEntries(req.nextUrl.searchParams.entries());
  console.log(req.nextUrl.toString());

  const scoreMin = parseSearchParamNumber(rawScoreMin);
  const scoreMax = parseSearchParamNumber(rawScoreMax);

  const data = await myTestGetTestResults({
    testId,
    searchParams: { scoreMin, scoreMax, query: q },
  });
  return NextResponse.json(data);
}

function parseSearchParamNumber(val?: string) {
  const parsed = Number(val);
  if (isNaN(parsed)) return undefined;
  return parsed;
}

export const dynamic = "force-dynamic";
