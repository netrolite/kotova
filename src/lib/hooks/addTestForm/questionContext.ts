import AddTestFormQuestionContext from "@/lib/contexts/addTestForm/question";
import useContextVal from "../contextVal";

export default function useAddTestFormQuestionContext() {
  return useContextVal(AddTestFormQuestionContext);
}
