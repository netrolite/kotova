"use client";

import useUserProfileContext from "@/lib/hooks/user/context";
import AvatarWithFallback from "../AvatarWithFallback";

type Props = {};

export default function UserProfileAvatar({}: Props) {
  const { user } = useUserProfileContext();
  return (
    <AvatarWithFallback
      src={user.image || undefined}
      username={user.name || undefined}
      width={100}
      userIconClassName="stroke-1"
    />
  );
}
