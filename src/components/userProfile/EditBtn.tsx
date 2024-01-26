"use client";

import { PencilIcon } from "lucide-react";
import Link from "next/link";
import useUserProfileContext from "@/lib/hooks/user/context";
import BtnWithIcon from "../Btns/WithIcon";

type Props = {};

export default function UserProfileEditBtn({}: Props) {
  const { user, signedInUser } = useUserProfileContext();
  if (signedInUser?.id !== user.id) return null;

  return (
    <Link
      className="hover:no-underline"
      href={`/users/${signedInUser.id}/edit`}
    >
      <BtnWithIcon icon={<PencilIcon width={20} />} variant="outline">
        Изменить профиль
      </BtnWithIcon>
    </Link>
  );
}
