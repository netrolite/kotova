import AddTestFormQuestionOptionContext from "@/lib/contexts/addTestForm/questionOption";
import useContextVal from "../contextVal";

export default function useAddTestFormQuestionOption() {
  return useContextVal(AddTestFormQuestionOptionContext);
}
