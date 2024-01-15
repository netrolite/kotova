import { UserProfileContext } from "@/lib/contexts/user/provider";
import useContextVal from "../contextVal";

export default function useUserProfileContext() {
  return useContextVal(UserProfileContext);
}
