import UserTestResultContext from "@/lib/contexts/user/testResult";
import useContextVal from "../../contextVal";

export default function useUserTestResultContext() {
  return useContextVal(UserTestResultContext);
}
