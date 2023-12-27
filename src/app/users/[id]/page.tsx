import PageTitle from "@/components/PageTitle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
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
  const data = await db.user.findFirst({
    where: { id },
    include: { testResults: { include: { test: true } } },
  });
  if (!data) notFound();
  const { testResults, ...user } = data;
  const userRoleName = getUserRoleName(user.role);

  return (
    <div className="space-y-8">
      <section className="flex gap-6">
        <Avatar className="h-[100px] w-[100px]">
          <AvatarImage src={user.image || UserIcon.toString()} />
          <AvatarFallback>
            <Skeleton />
          </AvatarFallback>
        </Avatar>
        <div>
          <PageTitle className="-mb-1">{user.name}</PageTitle>
          {userRoleName && (
            <h3 className="text-muted-foreground">{userRoleName}</h3>
          )}
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
