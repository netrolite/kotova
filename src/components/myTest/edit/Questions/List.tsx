import MyTestEditFormQuestionContextProvider from "@/lib/contexts/myTestEditForm/questionProvider";
import useMyTestEditFormContext from "@/lib/hooks/myTestEditForm/context";
import MyTestEditFormQuestionActions from "./Actions";
import MyTestEditFormQuestionText from "./QuestionText";
import MyTestEditFormQuestion from "./Question";
import MyTestEditFormQuestionAnswerExplanation from "./QuestionAnswerExplanation";
import { FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import MyTestEditFormQuestionType from "./QuestionType";

type Props = {};

export default function MyTestEditFormQuestionList({}: Props) {
  const { questionsFields } = useMyTestEditFormContext();
  if (!questionsFields.fields.length) return null;

  return (
    <ul className="space-y-10">
      {questionsFields.fields.map((question, i, arr) => {
        const isLast = arr.length - 1 === i;
        return (
          <li key={question.id} className="space-y-1">
            <MyTestEditFormQuestionContextProvider value={{ index: i }}>
              <div className="flex gap-2">
                <p className="font-bold">Вопрос {i + 1}</p>
                <MyTestEditFormQuestionActions />
              </div>
              <MyTestEditFormQuestionType />

              <div className="space-y-4">
                <MyTestEditFormQuestionText />
                <MyTestEditFormQuestion />
                <MyTestEditFormQuestionAnswerExplanation />
              </div>
              <FormMessage />
            </MyTestEditFormQuestionContextProvider>

            {!isLast && <Separator style={{ marginTop: 52 }} />}
          </li>
        );
      })}
    </ul>
  );
}
