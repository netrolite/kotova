import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import Link from "next/link";

type Props = {
  categories: Category[];
};

export default function CategoriesList({ categories }: Props) {
  if (!categories?.length) {
    return (
      <div>
        Нет предметов. Зайдите на эту страницу немного позже, может быть здесь
        что-нибудь появится!
      </div>
    );
  }

  return (
    <ul>
      {categories?.map(({ id, title }) => {
        return (
          <li key={id} className="flex justify-between">
            <Link className="w-full" href={`/categories/${id}`}>
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
