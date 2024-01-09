import { createContext } from "react";

type AddTestFormQuestionContextType = {
  index: number;
};
const AddTestFormQuestionContext =
  createContext<AddTestFormQuestionContextType | null>(null);
export default AddTestFormQuestionContext;
