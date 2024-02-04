import myTestGetTestResults from "@/lib/fetchers/myTest/getTestResults";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { testId: string };
};

type SearchParams = {
  q?: string;
  scoreGt?: string;
  scoreLt?: string;
  timesTakenGt?: string;
  timesTakenLt?: string;
};

export async function GET(req: NextRequest, { params: { testId } }: Context) {
  const {
    q,
    scoreGt: rawScoreGt,
    scoreLt: rawScoreLt,
    timesTakenGt: rawTimesTakenGt,
    timesTakenLt: rawTimesTakenLt,
  }: SearchParams = Object.fromEntries(req.nextUrl.searchParams.entries());

  const scoreGt = parseSearchParamNumber(rawScoreGt);
  const scoreLt = parseSearchParamNumber(rawScoreLt);
  const timesTakenGt = parseSearchParamNumber(rawTimesTakenGt);
  const timesTakenLt = parseSearchParamNumber(rawTimesTakenLt);

  const data = await myTestGetTestResults({
    testId,
    searchParams: { scoreGt, scoreLt, timesTakenGt, timesTakenLt, query: q },
  });
  return NextResponse.json(data);
}

function parseSearchParamNumber(val?: string) {
  const parsed = Number(val);
  if (isNaN(parsed)) return undefined;
  return parsed;
}

export const dynamic = "force-dynamic";
