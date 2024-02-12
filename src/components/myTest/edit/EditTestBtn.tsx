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
import useEditTestFormStore from "@/lib/stores/editTestForm";

type Props = { isLoading: boolean };

export default function MyTestEditFormEditTestBtn({ isLoading }: Props) {
  const { formRef } = useMyTestEditFormContext();
  const [isEditTestDialogOpen, setIsEditTestDialogOpen] = useEditTestFormStore(
    (s) => [s.isEditTestDialogOpen, s.setIsEditTestDialogOpen],
  );
  return (
    <Dialog open={isEditTestDialogOpen} onOpenChange={setIsEditTestDialogOpen}>
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
            Изменить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
