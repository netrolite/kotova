import { AddTestFormQuestionSchemaType } from "@/lib/zod/schemas/addTestForm/Question";
import { AddTestFormQuestions } from "../Index";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import AddTestFormQuestionList from "./List";
import { FormField, FormMessage } from "@/components/ui/form";

export type AddTestFormQuestionSchemaWithId = AddTestFormQuestionSchemaType & {
  id: string;
};

export default function AddTestFormQuestions() {
  const { control } = useAddTestFormContext();
  return (
    <>
      <h3 className="mb-2 text-xl font-semibold">Вопросы</h3>
      <FormField
        control={control}
        name="questions"
        render={() => <FormMessage />}
      />
      <AddTestFormQuestionList />
    </>
  );
}
