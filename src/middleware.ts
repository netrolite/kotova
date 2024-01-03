import { stackMiddlewares } from "./middlewares/stackMiddlewares";
import withUrlHeader from "./middlewares/withUrlHeader";

export default stackMiddlewares([withUrlHeader]);
