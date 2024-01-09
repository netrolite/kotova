import { FormMessage } from "@/components/ui/form";
import { AddTestFormQuestionSchemaType } from "@/lib/zod/schemas/addTestForm/Question";
import { Separator } from "@/components/ui/separator";
import AddTestFormQuestionType from "./QuestionType";
import AddTestFormQuestionAnswerExplanation from "./QuestionAnswerExplanation";
import AddTestFormQuestionActions from "./Actions";
import AddTestFormQuestion from "./Question";
import { AddTestFormQuestions } from "../Index";
import AddTestFormQuestionText from "./QuestionText";

export type AddTestFormQuestionSchemaWithId = AddTestFormQuestionSchemaType & {
  id: string;
};

type Props = {
  questions: AddTestFormQuestions;
};

export default function AddTestFormQuestions({ questions }: Props) {
  if (!questions.fields) return null;
  return (
    <div className="space-y-6">
      <h3 className="mb-4 text-xl font-semibold">Вопросы</h3>
      <div className="space-y-10">
        {questions.fields.map((question, i) => {
          return (
            <div key={question.id} className="space-y-14">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <p className="font-bold">Вопрос {i + 1}</p>
                  <AddTestFormQuestionActions {...{ questions, index: i }} />
                </div>
                <div className="flex flex-col gap-4">
                  <AddTestFormQuestionType index={i} />
                  <AddTestFormQuestionText index={i} />
                  <AddTestFormQuestion index={i} />
                  <AddTestFormQuestionAnswerExplanation index={i} />
                </div>
                <FormMessage />
              </div>

              <Separator />
            </div>
          );
        })}
      </div>
    </div>
  );
}
