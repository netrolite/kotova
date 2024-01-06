import FormItemField from "@/components/Form/ItemField";
import {
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getQuestionTypeLabelByNumber } from "@/lib/getQuestionType";
import useAddTestStore from "@/lib/stores/routes/my/tests/add/addTest";
import { AddTestSchemaInputType } from "@/lib/zod/schemas/AddTest";
import { useFormContext } from "react-hook-form";

type Props = {};

export default function AddTestFormQuestions({}: Props) {
  const form = useFormContext<AddTestSchemaInputType>();
  const questions = useAddTestStore((s) => s.questions);

  return questions.map((question, i) => {
    const questionType = getQuestionTypeLabelByNumber(question.type);
    return (
      <FormItemField
        control={form.control}
        name="questions"
        render={({ field }) => (
          <>
            <FormLabel>Вопрос {i + 1}</FormLabel>
            <FormControl></FormControl>
            <FormDescription>{questionType}</FormDescription>
            <FormMessage />
          </>
        )}
      />
    );
  });
}
