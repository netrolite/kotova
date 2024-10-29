import getCategories from "@/lib/fetchers/getCategories";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await getCategories();
  return NextResponse.json(categories);
}

export const dynamic = "force-dynamic";
