import { Button } from "@/components/ui/button";
import { Subject } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import deleteSubjectAction from "@/lib/actions/deleteSubject";
import SubjectDeleteBtn from "./SubjectDeleteBtn";

type Props = {
  subjects: Subject[];
  isAdmin: boolean;
};

export default function SubjectsListContent({ subjects, isAdmin }: Props) {
  if (!subjects?.length) {
    return (
      <div>
        Нет предметов. Зайдите на эту страницу немного позже, может быть здесь
        что-нибудь появится!
      </div>
    );
  }

  return (
    <ul>
      {subjects?.map(({ id, title }) => {
        return (
          <li key={id} className="flex justify-between">
            <Link className="w-full" href={`/tests/${id}`}>
              <Button className="w-full justify-start" variant="ghost">
                {title}
              </Button>
            </Link>
            {isAdmin && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" className="hover:text-destructive">
                    <TrashIcon />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Вы уверены, что хотите навсегда удалить предмет {title}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Это действие не может быть отменено.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Отменить</AlertDialogCancel>
                    <SubjectDeleteBtn {...{ subjectId: id }} />
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </li>
        );
      })}
    </ul>
  );
}
