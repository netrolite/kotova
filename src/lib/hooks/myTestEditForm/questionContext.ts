import useContextVal from "../contextVal";
import MyTestEditFormQuestionContext from "@/lib/contexts/myTestEditForm/question";

export default function useMyTestEditFormQuestionContext() {
  return useContextVal(MyTestEditFormQuestionContext);
}
