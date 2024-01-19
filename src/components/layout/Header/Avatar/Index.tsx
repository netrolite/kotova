import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/auth";
import getUsername from "@/lib/getUsername";
import HeaderAvatarDropdownMenuContent from "./DropdownMenuContent/Index";
import AvatarWithFallback from "@/components/AvatarWithFallback";

export default async function HeaderAvatar() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const avatarSrc = session?.user?.image ?? undefined;
  const username = getUsername(session);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarWithFallback
          {...{
            width: 32,
            src: avatarSrc,
            username,
          }}
        />
      </DropdownMenuTrigger>
      <HeaderAvatarDropdownMenuContent
        {...{ username, userId: session.user.id }}
      />
    </DropdownMenu>
  );
}
