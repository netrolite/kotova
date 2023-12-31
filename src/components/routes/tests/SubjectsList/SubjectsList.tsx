import { Button } from "@/components/ui/button";
import { Subject } from "@prisma/client";
import Link from "next/link";

type Props = {
  subjects: Subject[];
};

export default function SubjectsListContent({ subjects }: Props) {
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
            {/* {isAdmin && (
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
            )} */}
          </li>
        );
      })}
    </ul>
  );
}
