"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import deleteTestAction from "@/lib/actions/deleteTest";
import { GENERIC_ERROR_MSG } from "@/lib/constants";
import useMyTestContext from "@/lib/contexts/myTest/useContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Loading from "../Loading/Loading";
import { Button } from "../ui/button";

export default function MyTestActionBtns() {
  const [open, setOpen] = useState(false);
  const { id: testId } = useMyTestContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDeleteTest() {
    setIsDeleting(true);
    try {
      const result = await deleteTestAction({ testId });
      if (result.error) throw new Error();
      toast.success("Тест был успешно удален");
      router.replace("/my/tests");
    } catch (err) {
      setIsDeleting(false);
      toast.error(GENERIC_ERROR_MSG);
    }
  }

  return (
    <div className="flex gap-1">
      <Link href={`/my/tests/${testId}/edit`}>
        <Button variant="outline">Изменить тест</Button>
      </Link>

      <Dialog {...{ open }} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Удалить тест</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Вы уверены, что хотите удалить этот тест?</DialogTitle>
            <DialogDescription>
              Это действие нельзя будет отменить
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-min gap-1">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Отменить
            </Button>

            <Button
              variant="destructive"
              className="flex gap-1"
              disabled={isDeleting}
              onClick={handleDeleteTest}
            >
              {isDeleting && (
                <Loading className="h-4 w-4 fill-red-900 text-white" />
              )}
              <span>Удалить</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
