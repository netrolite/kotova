import TakeTestContext from "@/lib/contexts/takeTest/Index/Index";
import useContextVal from "../contextVal";

export default function useTakeTestContext() {
  return useContextVal(TakeTestContext);
}
