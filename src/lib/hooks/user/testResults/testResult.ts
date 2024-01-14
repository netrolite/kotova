import UserTestResultContext from "@/lib/contexts/user/testResults/testResult";
import useContextVal from "../../contextVal";

export default function useUserTestResult() {
  return useContextVal(UserTestResultContext);
}
