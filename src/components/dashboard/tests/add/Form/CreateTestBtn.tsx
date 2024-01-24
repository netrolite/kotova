import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import FormSubmitBtn from "@/components/Btns/Submit";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";

type Props = { isLoading: boolean };

export default function AddTestFormCreateTestBtn({ isLoading }: Props) {
  const { formRef } = useAddTestFormContext();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <FormSubmitBtn {...{ isLoading }}>Создать тест</FormSubmitBtn>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы уверены, что хотите создать тест?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              formRef.current?.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true }),
              )
            }
          >
            Создать
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
