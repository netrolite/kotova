import {
  TEST_QUESTION_TYPE,
  TestQuestionType,
} from "@/lib/types/enums/TestQuestionType";
import { ReactNode } from "react";

type Props = {
  render: ({ type }: { type: TestQuestionType; i: number }) => ReactNode;
};

export default function QuestionTypesList({ render }: Props) {
  return Object.values(TEST_QUESTION_TYPE).map((type, i) =>
    render({ type, i }),
  );
}
