import getSubjects from "@/lib/fetchers/getSubjects";
import { NextResponse } from "next/server";

export async function GET() {
  const subjects = await getSubjects();
  return NextResponse.json(subjects);
}

export const dynamic = "force-dynamic";
