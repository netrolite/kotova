import getSubjects from "@/lib/fetchers/getSubjects";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const subjects = await getSubjects();
  return NextResponse.json(subjects);
}
