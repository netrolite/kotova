import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";
import TestResultTextAnswer from "./answersTypes/Text";
import useTestResultAnswerContext from "@/lib/hooks/testResult/answerContext";

type Props = {};

export default function TestResultAnswer({}: Props) {
  const answer = useTestResultAnswerContext();
  switch (answer.type) {
    case TEST_QUESTION_TYPE.TEXT:
      return <TestResultTextAnswer />;
    default:
      return <TestResultTextAnswer />;
  }
}
