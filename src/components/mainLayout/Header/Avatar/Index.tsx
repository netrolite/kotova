import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import getUsername from "@/lib/getUsername";
import HeaderAvatarDropdownMenuContent from "./DropdownMenuContent/Index";
import AvatarWithFallback from "@/components/AvatarWithFallback";
import { User } from "@prisma/client";

type Props = {
  user: User;
};

export default async function HeaderAvatar({ user }: Props) {
  if (!user?.id) return null;

  const avatarSrc = user?.image ?? undefined;
  const username = getUsername(user);

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
      <HeaderAvatarDropdownMenuContent {...{ username, userId: user.id }} />
    </DropdownMenu>
  );
}
