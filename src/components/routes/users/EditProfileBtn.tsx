import { PencilIcon } from "lucide-react";
import Link from "next/link";
import getSignedInUser from "@/lib/data/getSignedInUser";
import { Button } from "@/components/ui/button";

type Props = {
  userId: string;
};

export default async function UserEditProfileBtn({ userId }: Props) {
  const signedInUser = await getSignedInUser();
  if (signedInUser?.id !== userId) return null;

  return (
    <Link href={`/users/${signedInUser.id}/edit`}>
      <Button variant="outline" className="flex gap-1">
        <PencilIcon width={20} />
        <span>Изменить профиль</span>
      </Button>
    </Link>
  );
}
