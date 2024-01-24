import AddTestFormQuestionOptionContext from "@/lib/contexts/addTestForm/questionOption";
import useContextVal from "../contextVal";

export default function useAddTestFormQuestionOptionContext() {
  return useContextVal(AddTestFormQuestionOptionContext);
}
