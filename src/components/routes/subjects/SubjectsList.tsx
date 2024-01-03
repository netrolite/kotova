import { Button } from "@/components/ui/button";
import { Subject } from "@prisma/client";
import Link from "next/link";

type Props = {
  subjects: Subject[];
};

export default function SubjectsList({ subjects }: Props) {
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
            <Link className="w-full" href={`/subjects/${id}`}>
              <Button className="w-full justify-start" variant="ghost">
                {title}
              </Button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
