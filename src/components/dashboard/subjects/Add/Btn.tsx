"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddSubjectForm from "./Form";
import useAddSubjectStore from "@/lib/stores/addSubject";

export default function AddSubjectBtn() {
  const { isOpen, setIsOpen } = useAddSubjectStore((s) => ({
    isOpen: s.isAddSubjectDialogOpen,
    setIsOpen: s.setIsAddSubjectDialogOpen,
  }));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Создать предмет</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать новый предмет</DialogTitle>
          <AddSubjectForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
