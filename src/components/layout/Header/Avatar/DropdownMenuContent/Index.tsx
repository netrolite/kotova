"use client";

import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import signOutAction from "@/lib/actions/signOut";
import { LogOutIcon } from "lucide-react";
import HeaderAvatarDropdownMenuContentItem from "./Item";

type Props = {
  username: string;
};

export default function HeaderAvatarDropdownMenuContent({ username }: Props) {
  return (
    <DropdownMenuContent align="end" className="min-w-[200px] max-w-[350px]">
      <DropdownMenuLabel className="truncate">{username}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <HeaderAvatarDropdownMenuContentItem
        formAction={signOutAction}
        icon={<LogOutIcon />}
      >
        Выйти
      </HeaderAvatarDropdownMenuContentItem>
      <HeaderAvatarDropdownMenuContentItem
        icon={<LogOutIcon />}
        onClick={() => console.log("fuck this")}
      >
        test
      </HeaderAvatarDropdownMenuContentItem>
    </DropdownMenuContent>
  );
}
