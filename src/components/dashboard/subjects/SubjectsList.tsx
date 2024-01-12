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
import { deleteSubjectMutation } from "@/lib/actions/deleteSubject";
import { genericErrorMsg } from "@/lib/constants";
import useSubjectsSwr from "@/lib/hooks/swr/subjects";
import { Subject } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SubjectsList() {
  const { data: subjects, mutate, isLoading, error } = useSubjectsSwr();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  function handleDelete(id: string) {
    setIsDialogOpen(false);
    mutate(deleteSubjectMutation(id), {
      optimisticData: subjects?.filter((s) => s.id !== id),
    });
  }

  if (isLoading) {
    return <Loading />;
  }
  if (error) return <p>{genericErrorMsg}</p>;
  if (subjects && !subjects.length) {
    return <p>Нет предметов</p>;
  }

  function handleOpenDeleteDialog(id: string) {
    setIsDialogOpen(true);
    setSelectedSubject(subjects?.find((s) => s.id === id) || null);
  }

  return (
    <>
      <ul>
        {subjects?.map(({ id, title }) => (
          <li key={id} className="flex justify-between">
            <Link className="w-full" href={`/subjects/${id}`}>
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
              Вы уверены, что хотите навсегда удалить предмет{" "}
              {selectedSubject?.title}?
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
                selectedSubject && handleDelete(selectedSubject?.id)
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
