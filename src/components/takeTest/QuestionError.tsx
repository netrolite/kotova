import useTakeTestFormContext from "@/lib/hooks/takeTest/formContext";
import { FormField, FormMessage } from "../ui/form";

type Props = {
  questionIndex: number;
};

export default function TakeTestQuestionError({ questionIndex }: Props) {
  const { control } = useTakeTestFormContext();
  return (
    <FormField
      control={control}
      name={`answers.${questionIndex}`}
      render={() => <FormMessage />}
    />
  );
}
