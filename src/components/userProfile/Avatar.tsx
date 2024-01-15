"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserProfileContext from "@/lib/hooks/user/context";
import { UserIcon } from "lucide-react";

type Props = {};

export default function UserProfileAvatar({}: Props) {
  const { user } = useUserProfileContext();
  return (
    <Avatar className="h-[100px] w-[100px]">
      <AvatarImage src={user.image || undefined} />
      <AvatarFallback className="bg-transparent text-4xl">
        <UserIcon className="h-[100px] w-[100px] stroke-1 text-slate-400" />
      </AvatarFallback>
    </Avatar>
  );
}
