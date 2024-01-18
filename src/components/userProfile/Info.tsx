"use client";

import useUserProfileContext from "@/lib/hooks/user/context";
import PageTitle from "../PageTitle";
import UserProfileAvatar from "./Avatar";
import getUserRoleName from "@/lib/getUserRoleName";
import UserProfileEditBtn from "./EditBtn";

type Props = {};

export default function UserProfileInfo({}: Props) {
  const { user } = useUserProfileContext();
  const userRoleName = getUserRoleName(user.role);

  return (
    <section className="flex gap-6">
      <UserProfileAvatar />
      <div className="space-y-2">
        <div className="space-y-1">
          <PageTitle className="-mb-1">{user.name}</PageTitle>
          {userRoleName && (
            <h3 className="text-muted-foreground">{userRoleName}</h3>
          )}
        </div>
        <UserProfileEditBtn />
      </div>
    </section>
  );
}