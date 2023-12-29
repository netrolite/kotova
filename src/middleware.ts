import { stackMiddlewares } from "./lib/middlewares/stackMiddlewares";
import withUrlHeader from "./middlewares/withUrlHeader";

export default stackMiddlewares([withUrlHeader]);
