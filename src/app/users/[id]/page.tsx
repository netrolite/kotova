import Loading from "@/components/Loading/Loading";
import PageTitle from "@/components/PageTitle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserEditProfileBtn from "@/components/userProfile/EditBtn";
import UserTestResults from "@/components/userProfile/TestResults/Index";
import UserContextProvider from "@/lib/contexts/user/provider";
import getSignedInUser from "@/lib/fetchers/getSignedInUser";
import getUserRecentTestResults from "@/lib/fetchers/users/getUserTestResults";
import getUserRoleName from "@/lib/getUserRoleName";
import { TestResult, User } from "@prisma/client";
import { UserIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function User({
  params: { id },
}: {
  params: { id: string };
}) {
  const signedInUserPromise = getSignedInUser({
    select: { id: true, testResults: { select: { testId: true } } },
  }) as Promise<(User & { testResults: { testId: string }[] }) | null>;
  const userPromise = getUserRecentTestResults(id);
  const [signedInUser, user] = await Promise.all([
    signedInUserPromise,
    userPromise,
  ]);
  if (!user) notFound();

  const userRoleName = getUserRoleName(user.role);

  return (
    <UserContextProvider {...{ signedInUser, user }}>
      <div className="space-y-16">
        <section className="flex gap-6">
          <Avatar className="h-[100px] w-[100px]">
            <AvatarImage src={user.image || UserIcon.toString()} />
            <AvatarFallback className="bg-transparent text-4xl">
              {user.name?.slice(0, 1) ?? (
                <UserIcon className="h-[100px] w-[100px] text-slate-500" />
              )}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <div className="space-y-1">
              <PageTitle className="-mb-1">{user.name}</PageTitle>
              {userRoleName && (
                <h3 className="text-muted-foreground">{userRoleName}</h3>
              )}
            </div>
            <UserEditProfileBtn />
          </div>
        </section>
        <section>
          <h3 className="mb-6 text-xl font-medium">Недавно пройденные тесты</h3>
          <Suspense fallback={<Loading />}>
            <UserTestResults {...user} />
          </Suspense>
        </section>
      </div>
    </UserContextProvider>
  );
}
