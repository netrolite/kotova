import { PencilIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { auth } from "@/auth";

type Props = {};

export default async function UserEditProfileBtn({}: Props) {
  console.time("timer2");
  const session = await auth();
  console.timeEnd("timer2");

  if (!session?.user?.id) return null;
  return (
    <Link href={`/users/${session?.user?.id}/edit`}>
      <Button variant="outline" className="flex gap-1">
        <PencilIcon width={20} />
        <span>Изменить профиль</span>
      </Button>
    </Link>
  );
}
