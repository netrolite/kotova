"use client";

import Loading from "@/components/Loading/Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteCategoryMutation } from "@/lib/actions/deleteCategory";
import { GENERIC_ERROR_MSG } from "@/lib/constants";
import useCategoriesSwr from "@/lib/hooks/swr/categories";
import { Category } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CategoriesList() {
  const { data: categories, mutate, isLoading, error } = useCategoriesSwr();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  function handleDelete(id: string) {
    setIsDialogOpen(false);
    mutate(deleteCategoryMutation(id), {
      optimisticData: categories?.filter((s) => s.id !== id),
    });
  }

  if (isLoading) {
    return <Loading />;
  }
  if (error) return <p>{GENERIC_ERROR_MSG}</p>;
  if (categories && !categories.length) {
    return <p>Нет категорий</p>;
  }

  function handleOpenDeleteDialog(id: string) {
    setIsDialogOpen(true);
    setSelectedCategory(categories?.find((s) => s.id === id) || null);
  }

  return (
    <>
      <ul>
        {categories?.map(({ id, title }) => (
          <li key={id} className="flex justify-between">
            <Link className="w-full" href={`/categories/${id}`}>
              <Button className="w-full justify-start" variant="ghost">
                {title}
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="hover:text-destructive"
              onClick={() => handleOpenDeleteDialog(id)}
            >
              <div className="alert-trigger">
                <TrashIcon />
              </div>
            </Button>
          </li>
        ))}
      </ul>
      <AlertDialog open={isDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Вы уверены, что хотите навсегда удалить категорию{" "}
              {selectedCategory?.title}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Это действие не может быть отменено.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Отменить
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive"
              onClick={() =>
                selectedCategory && handleDelete(selectedCategory?.id)
              }
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
