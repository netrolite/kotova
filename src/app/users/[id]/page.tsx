import { auth } from "@/auth";
import Loading from "@/components/Loading/Loading";
import PageTitle from "@/components/PageTitle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserEditProfileBtn from "@/components/userProfile/EditBtn";
import UserTestResults from "@/components/userProfile/TestResults/Index";
import { db } from "@/lib/db";
import usersGetUserTestResults from "@/lib/fetchers/users/getUserTestResults";
import getUserRoleName from "@/lib/getUserRoleName";
import { UserIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function User({
  params: { id },
}: {
  params: { id: string };
}) {
  const sessionPromise = auth();
  const userPromise = usersGetUserTestResults(id);
  const [session, user] = await Promise.all([sessionPromise, userPromise]);
  if (!user) notFound();

  const userRoleName = getUserRoleName(user.role);
  const isOwnAccount = session?.user?.id === user.id;

  return (
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
          {isOwnAccount && <UserEditProfileBtn userId={id} />}
        </div>
      </section>
      <section>
        <h3 className="mb-6 text-xl font-medium">Недавно пройденные тесты</h3>
        <Suspense fallback={<Loading />}>
          <UserTestResults {...user} />
        </Suspense>
      </section>
    </div>
  );
}
