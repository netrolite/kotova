"use client";

import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import signOutAction from "@/lib/actions/signOut";
import { LogOutIcon } from "lucide-react";
import HeaderAvatarDropdownMenuContentItem from "./Item";
import Link from "next/link";

type Props = {
  username: string;
  userId: string;
};

export default function HeaderAvatarDropdownMenuContent({
  username,
  userId,
}: Props) {
  return (
    <DropdownMenuContent align="end" className="min-w-[200px] max-w-[350px]">
      <DropdownMenuLabel>
        <Link className="hover:underline" href={`/users/${userId}/`}>
          {username}
        </Link>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <HeaderAvatarDropdownMenuContentItem
        formAction={signOutAction}
        icon={<LogOutIcon />}
      >
        Выйти
      </HeaderAvatarDropdownMenuContentItem>
    </DropdownMenuContent>
  );
}
