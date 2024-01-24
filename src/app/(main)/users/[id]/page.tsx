import UserProfileInfo from "@/components/userProfile/Info";
import UserProfileRecentTestResults from "@/components/userProfile/RecentTestResults/Index";
import UserProfileContextProvider from "@/lib/contexts/user/provider";
import getSignedInUser from "@/lib/fetchers/getSignedInUser";
import userProfileGetUser from "@/lib/fetchers/userProfile/getUser";
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
  const userPromise = userProfileGetUser(userId);
  const [signedInUser, user] = await Promise.all([
    signedInUserPromise,
    userPromise,
  ]);
  if (!user) notFound();

  return (
    <UserProfileContextProvider {...{ signedInUser, user, userId }}>
      <div className="space-y-16">
        <UserProfileInfo />
        <UserProfileRecentTestResults />
      </div>
    </UserProfileContextProvider>
  );
}
