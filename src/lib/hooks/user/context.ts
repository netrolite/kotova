import { UserContext } from "@/lib/contexts/user/provider";
import useContextVal from "../contextVal";

export default function useUserContext() {
  return useContextVal(UserContext);
}
