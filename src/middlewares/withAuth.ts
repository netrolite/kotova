import MiddlewareFactory from "@/lib/types/MiddlewareFactory";
import { NextFetchEvent, NextRequest } from "next/server";
import { auth } from "../auth";

const withAuth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    await auth();
    return next(request, _next);
  };
};

export default withAuth;
