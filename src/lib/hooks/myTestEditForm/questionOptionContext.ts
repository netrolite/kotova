import useContextVal from "../contextVal";
import MyTestEditFormQuestionOptionContext from "@/lib/contexts/myTestEditForm/questionOption";

export default function useMyTestEditFormQuestionOptionContext() {
  return useContextVal(MyTestEditFormQuestionOptionContext);
}
