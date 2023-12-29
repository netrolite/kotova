import { stackMiddlewares } from "./lib/middlewares/stackMiddlewares";
import withAuth from "./middlewares/withAuth";
import withUrlHeader from "./middlewares/withUrlHeader";

export default stackMiddlewares([withAuth, withUrlHeader]);

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
