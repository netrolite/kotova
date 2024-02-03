import useContextVal from "@/lib/hooks/contextVal";
import MyTestContext from ".";

export default function useMyTestContext() {
  return useContextVal(MyTestContext);
}
