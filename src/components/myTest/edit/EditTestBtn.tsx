import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import FormSubmitBtn from "@/components/Btns/Submit";
import useMyTestEditFormContext from "@/lib/hooks/myTestEditForm/context";
import { Button } from "@/components/ui/button";

type Props = { isLoading: boolean };

export default function MyTestEditFormEditTestBtn({ isLoading }: Props) {
  const { formRef } = useMyTestEditFormContext();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FormSubmitBtn {...{ isLoading }}>Изменить тест</FormSubmitBtn>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Вы уверены, что хотите изменить тест?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() =>
              formRef.current?.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true }),
              )
            }
          >
            Создать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
