"use client";

import FormSubmitBtn from "@/components/Form/SubmitBtn";
import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import deleteSubjectAction from "@/lib/actions/deleteSubject";
import useLoading from "@/lib/hooks/useLoading";

type Props = {
  subjectId: string;
};

export default function SubjectDeleteBtn({ subjectId }: Props) {
  const { isLoading, setIsLoading } = useLoading();
  async function handleDelete() {
    setIsLoading(true);
    await deleteSubjectAction(subjectId);
    setIsLoading(false);
  }

  return (
    <AlertDialogAction className="" asChild>
      <FormSubmitBtn onClick={handleDelete} {...{ isLoading }}>
        Удалить
      </FormSubmitBtn>
    </AlertDialogAction>
  );
}
