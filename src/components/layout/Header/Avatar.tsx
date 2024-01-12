import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUsername from "@/lib/hooks/username";
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
      <DropdownMenuContent align="end" className="min-w-[200px] max-w-[350px]">
        <DropdownMenuLabel className="truncate">{username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer space-x-2"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOutIcon width={16} />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
