"use client";

import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useUserProfileContext from "@/lib/hooks/user/context";

type Props = {};

export default async function UserProfileEditBtn({}: Props) {
  const { user, signedInUser } = useUserProfileContext();
  if (signedInUser?.id !== user.id) return null;

  return (
    <Link href={`/users/${signedInUser.id}/edit`}>
      <Button variant="outline" className="flex gap-1">
        <PencilIcon width={20} />
        <span>Изменить профиль</span>
      </Button>
    </Link>
  );
}
