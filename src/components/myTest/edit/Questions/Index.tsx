import useMyTestEditFormContext from "@/lib/hooks/myTestEditForm/context";
import MyTestEditFormQuestionList from "./List";
import { FormField, FormMessage } from "@/components/ui/form";
import { MyTestEditFormQuestionSchemaType } from "@/lib/zod/schemas/myTestEditForm/Question";

export type MyTestEditFormQuestionSchemaWithId =
  MyTestEditFormQuestionSchemaType & {
    id: string;
  };

export default function MyTestEditFormQuestions() {
  const { control } = useMyTestEditFormContext();
  return (
    <>
      <h3 className="mb-2 text-xl font-semibold">Вопросы</h3>
      <FormField
        control={control}
        name="questions"
        render={() => <FormMessage />}
      />
      <MyTestEditFormQuestionList />
    </>
  );
}
