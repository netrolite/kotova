import { auth } from "@/auth";
import PageTitle from "@/components/PageTitle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import UserEditProfileBtn from "@/components/users/EditProfileBtn";
import UserTestResults from "@/components/users/TestResults";
import { db } from "@/lib/db";
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
  const dataPromise = await db.user.findFirst({
    where: { id },
    include: { testResults: { include: { test: true } } },
  });
  const [session, data] = await Promise.all([sessionPromise, dataPromise]);
  if (!data) notFound();

  const { testResults, ...user } = data;
  const userRoleName = getUserRoleName(user.role);
  const isOwnAccount = session?.user?.id === user.id;

  return (
    <div className="space-y-8">
      <section className="flex gap-6">
        <Avatar className="h-[100px] w-[100px]">
          <AvatarImage src={user.image || UserIcon.toString()} />
          <AvatarFallback>
            <Skeleton />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <div className="space-y-1">
            <PageTitle className="-mb-1">{user.name}</PageTitle>
            {userRoleName && (
              <h3 className="text-muted-foreground">{userRoleName}</h3>
            )}
          </div>
          {isOwnAccount && <UserEditProfileBtn />}
        </div>
      </section>
      <section>
        <h3 className="text-xl font-medium">Недавно пройденные тесты</h3>
        <Suspense>
          <UserTestResults {...{ user, testResults }} />
        </Suspense>
      </section>
    </div>
  );
}
