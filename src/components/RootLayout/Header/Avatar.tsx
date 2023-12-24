import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUsername from "@/lib/hooks/useUsername";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";

export default function HeaderAvatar() {
  const { status, data } = useSession();
  const username = useUsername();
  let avatarSrc = data?.user?.image ?? undefined;

  if (status === "unauthenticated") return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{username.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-1 min-w-[200px] max-w-[350px] p-3">
        <DropdownMenuLabel className="truncate">{username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer space-x-2"
          onClick={() => signOut()}
        >
          <LogOutIcon />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
