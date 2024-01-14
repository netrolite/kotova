import { TestResultContext } from "@/lib/contexts/testResult/Index/Index";
import useContextVal from "../contextVal";

export default function useTestResultContext() {
  return useContextVal(TestResultContext);
}
