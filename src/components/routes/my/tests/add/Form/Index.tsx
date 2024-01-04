"use client";

import { ComboboxItem } from "@/components/Combobox";
import { grades as allGrades } from "@/lib/constants";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useLoading from "@/lib/hooks/useLoading";
import AddTestSchema, {
  AddTestSchemaInputType,
  AddTestSchemaType,
} from "@/lib/zod/schemas/AddTest";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, FormProvider, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import FormItemField from "@/components/Form/ItemField";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Input } from "@/components/ui/input";
import FormSubmitBtn from "@/components/Btns/Submit";
import wait from "@/lib/wait";
import { toast } from "sonner";
import AddTestFormAddQuestionBtn from "./AddQuestionBtn";

type Props = {
  subjects: ComboboxItem<string>[];
};

type GetGradesFieldPropParams<T = false> = {
  currentGrade: number;
  field: ControllerRenderProps<AddTestSchemaType, "grades">;
  isLastInArray: boolean;
  isChecked: T extends true ? CheckedState : undefined;
};

export default function AddTestForm({ subjects }: Props) {
  const form = useForm<AddTestSchemaInputType>({
    resolver: zodResolver(AddTestSchema),
    defaultValues: {
      grades: [],
      name: "",
      questions: [],
      subject: "",
    },
  });
  const { control } = form;
  const { grades } = form.watch();
  const { isLoading, setIsLoading } = useLoading();
  // const [data, setData] = useState<Awaited<
  //   ReturnType<typeof editOwnProfileAction>
  // > | null>(null);

  async function handleSubmit(data: AddTestSchemaType) {
    console.log(data);
    setIsLoading(true);
    await wait(1000);
    // setData(await action(data));
    setIsLoading(false);
    toast.success("Тест успешно создан");
  }

  function getGradesFieldIsChecked({
    currentGrade: grade,
    field,
    isLastInArray,
  }: GetGradesFieldPropParams) {
    if (!isLastInArray) {
      return field.value?.includes(grade);
    }
    return allGrades.every((grade) => grades.includes(grade));
  }

  function getGradesFieldOnCheckedChange({
    currentGrade,
    field,
    isLastInArray,
    isChecked,
  }: GetGradesFieldPropParams<true>) {
    if (!isLastInArray) {
      if (isChecked) return field.onChange([...field.value, currentGrade]);
      return field.onChange(
        field.value?.filter((value) => value !== currentGrade),
      );
    }
    if (isChecked) return form.setValue("grades", allGrades);
    return form.setValue("grades", []);
  }

  return (
    <FormProvider {...form}>
      <form className="space-y-10" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormItemField
          control={control}
          name="name"
          render={({ field }) => (
            <>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Например: "Правописание безударных гласных"
              </FormDescription>
              <FormMessage />
            </>
          )}
        />

        <FormItemField
          control={control}
          name="subject"
          render={({ field }) => (
            <>
              <FormLabel>Предмет</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите предмет" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subjects.map(({ label, value }) => (
                    <SelectItem key={value} value={value.toString()}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </>
          )}
        />

        <FormField
          control={control}
          name="grades"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Классы</FormLabel>
                <FormDescription>
                  Выберите классы, для которых предназначен этот тест
                </FormDescription>
              </div>
              {/* grade 12 is rendered as a checkbox that selects all grades at once */}
              {[...allGrades, 12].map((grade, i, arr) => {
                const isLastInArray = i === arr.length - 1;
                return (
                  <FormField
                    key={grade}
                    control={control}
                    name="grades"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex items-center gap-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={getGradesFieldIsChecked({
                                currentGrade: grade,
                                field,
                                isLastInArray,
                                isChecked: undefined,
                              })}
                              onCheckedChange={(isChecked) =>
                                getGradesFieldOnCheckedChange({
                                  currentGrade: grade,
                                  field,
                                  isLastInArray,
                                  isChecked,
                                })
                              }
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {isLastInArray ? "Все классы" : `${grade} класс`}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                );
              })}
              <FormMessage />
            </FormItem>
          )}
        />
        <AddTestFormAddQuestionBtn />
        <FormSubmitBtn {...{ isLoading }}>Создать тест</FormSubmitBtn>
      </form>
    </FormProvider>
  );
}
