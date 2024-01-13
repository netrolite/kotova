import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/auth";
import getUsername from "@/lib/getUsername";
import HeaderAvatarDropdownMenuContent from "./DropdownMenuContent/Index";

export default async function HeaderAvatar() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const avatarSrc = session?.user?.image ?? undefined;
  const username = getUsername(session);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{username.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <HeaderAvatarDropdownMenuContent
        {...{ username, userId: session.user.id }}
      />
    </DropdownMenu>
  );
}
