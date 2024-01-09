import AddTestFormQuestionOptionContext from "@/lib/contexts/addTestForm/options";
import useContextVal from "../contextVal";

export default function useAddTestFormQuestionOption() {
  return useContextVal(AddTestFormQuestionOptionContext);
}
