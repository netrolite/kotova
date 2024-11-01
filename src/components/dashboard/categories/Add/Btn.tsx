"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddCategoryForm from "./Form";
import useAddCategoryStore from "@/lib/stores/addCategory";

export default function AddCategoryBtn() {
  const { isOpen, setIsOpen } = useAddCategoryStore((s) => ({
    isOpen: s.isAddCategoryDialogOpen,
    setIsOpen: s.setIsAddCategoryDialogOpen,
  }));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Создать категорию</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать новую категорию</DialogTitle>
          <AddCategoryForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
