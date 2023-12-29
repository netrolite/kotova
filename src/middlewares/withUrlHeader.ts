import MiddlewareFactory from "@/lib/types/MiddlewareFactory";
import { NextFetchEvent, NextRequest } from "next/server";

const withUrlHeader: MiddlewareFactory = (next) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    const res = await next(req, _next);
    res?.headers.set("x-url", req.url);
    return res;
  };
};

export default withUrlHeader;
