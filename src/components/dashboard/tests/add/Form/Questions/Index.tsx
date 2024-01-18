import { AddTestFormQuestionSchemaType } from "@/lib/zod/schemas/addTestForm/Question";
import { AddTestFormQuestions } from "../Index";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import FormError from "@/components/Form/Error";
import AddTestFormQuestionList from "./List";
import { Controller } from "react-hook-form";

export type AddTestFormQuestionSchemaWithId = AddTestFormQuestionSchemaType & {
  id: string;
};

export default function AddTestFormQuestions() {
  const {
    formState: { errors },
    control,
  } = useAddTestFormContext();

  return (
    <>
      <h3 className="mb-2 text-xl font-semibold">Вопросы</h3>
      <Controller
        control={control}
        name="questions"
        render={() => (
          <FormError
            error={errors.questions?.message || errors.questions?.root?.message}
          />
        )}
      />
      <AddTestFormQuestionList />
    </>
  );
}
