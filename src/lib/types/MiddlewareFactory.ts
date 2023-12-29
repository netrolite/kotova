import { NextMiddleware } from "next/server";
type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;
export default MiddlewareFactory;
