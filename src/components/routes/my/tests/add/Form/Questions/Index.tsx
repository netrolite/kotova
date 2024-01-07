import { FormMessage } from "@/components/ui/form";
import AddTestFormQuestion from "./Question";
import { AddTestFormQuestionSchemaType } from "@/lib/zod/schemas/addTestForm/Question";
import { Separator } from "@/components/ui/separator";
import AddTestFormQuestionQuestionType from "./QuestionType";
import AddTestFormQuestionAnswerExplanation from "./QuestionAnswerExplanation";
import useAddTestFormQuestionsArr from "@/lib/hooks/addTestForm/questionsArr";

export type AddTestFormQuestionSchemaWithId = AddTestFormQuestionSchemaType & {
  id: string;
};

export default function AddTestFormQuestions() {
  const { fields: questions } = useAddTestFormQuestionsArr();

  if (!questions.length) return null;
  return (
    <div className="space-y-6">
      <h3 className="mb-4 text-xl font-semibold">Вопросы</h3>
      <div className="space-y-10">
        {questions.map((question, i) => {
          const { id } = question;
          return (
            <div key={id} className="space-y-14">
              <div className="space-y-3">
                <p className="font-bold">Вопрос {i + 1}</p>
                <div className="space-y-1">
                  <AddTestFormQuestionQuestionType index={i} />
                  <AddTestFormQuestion {...question} />
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
