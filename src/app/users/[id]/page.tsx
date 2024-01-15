import PageTitle from "@/components/PageTitle";
import UserProfileAvatar from "@/components/userProfile/Avatar";
import UserProfileEditBtn from "@/components/userProfile/EditBtn";
import UserProfileRecentTestResults from "@/components/userProfile/RecentTestResults/Index";
import UserProfileContextProvider from "@/lib/contexts/user/provider";
import getSignedInUser from "@/lib/fetchers/getSignedInUser";
import userProfileGetRecentTestResults from "@/lib/fetchers/userProfile/getRecentTestResults";
import getUserRoleName from "@/lib/getUserRoleName";
import { User } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function UserProfile({
  params: { id: userId },
}: {
  params: { id: string };
}) {
  const signedInUserPromise = getSignedInUser({
    select: { id: true, testResults: { select: { testId: true } } },
  }) as Promise<(User & { testResults: { testId: string }[] }) | null>;
  const userPromise = userProfileGetRecentTestResults(userId);
  const [signedInUser, user] = await Promise.all([
    signedInUserPromise,
    userPromise,
  ]);
  if (!user) notFound();

  const userRoleName = getUserRoleName(user.role);

  return (
    <UserProfileContextProvider {...{ signedInUser, user, userId }}>
      <div className="space-y-16">
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
        <UserProfileRecentTestResults />
      </div>
    </UserProfileContextProvider>
  );
}
