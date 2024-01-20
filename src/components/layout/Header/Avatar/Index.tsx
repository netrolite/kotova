import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import getUsername from "@/lib/getUsername";
import HeaderAvatarDropdownMenuContent from "./DropdownMenuContent/Index";
import AvatarWithFallback from "@/components/AvatarWithFallback";
import { Session } from "next-auth";

type Props = {
  session: Session;
};

export default async function HeaderAvatar({ session }: Props) {
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
