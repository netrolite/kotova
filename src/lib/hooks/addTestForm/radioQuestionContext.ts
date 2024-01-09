import AddTestFormCheckboxQuestionContext from "@/lib/contexts/addTestForm/radioQuestion";
import useContextVal from "../contextVal";

export default function useAddTestFormRadioQuestionContext() {
  return useContextVal(AddTestFormCheckboxQuestionContext);
}
