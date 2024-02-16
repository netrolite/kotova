import myTestGetTestResults from "@/lib/fetchers/myTest/getTestResults";
import parseSearchParamNumber from "@/lib/parseSearchParamNumber";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { id: string };
};

type SearchParams = {
  q?: string;
  scoreMin?: string;
  scoreMax?: string;
};

export async function GET(
  req: NextRequest,
  { params: { id: testId } }: Context,
) {
  const {
    q,
    scoreMin: rawScoreMin,
    scoreMax: rawScoreMax,
  }: SearchParams = Object.fromEntries(req.nextUrl.searchParams.entries());

  const scoreMin = parseSearchParamNumber(rawScoreMin);
  const scoreMax = parseSearchParamNumber(rawScoreMax);

  const data = await myTestGetTestResults({
    testId,
    searchParams: { scoreMin, scoreMax, query: q },
  });
  return NextResponse.json(data);
}

export const dynamic = "force-dynamic";
