import PageTitle from "@/components/PageTitle";
import DashboardCardWrapper from "@/components/dashboard/Card/Wrapper";
import DashboardAvgScoreCard from "@/components/dashboard/Cards/AvgScore";
import DashboardSubjectsCard from "@/components/dashboard/Cards/Subjects";
import DashboardTakenTestsCard from "@/components/dashboard/Cards/TakenTests";
import DashboardMyTestsCard from "@/components/dashboard/Cards/MyTests";
import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import { ROLE } from "@/lib/types/enums/Role";

export default async function Dashboard() {
  const user = await getSignedInUserOrRedirect();
  const isAdmin = user.role === ROLE.ADMIN;
  const isTeacher = user.role === ROLE.TEACHER;
  const isStudent = user.role === ROLE.STUDENT;

  return (
    <>
      <PageTitle className="mb-8">Личный кабинет</PageTitle>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {isAdmin ||
          (isTeacher && (
            <DashboardCardWrapper>
              <DashboardMyTestsCard />
            </DashboardCardWrapper>
          ))}

        {isAdmin && (
          <DashboardCardWrapper>
            <DashboardSubjectsCard />
          </DashboardCardWrapper>
        )}

        {isStudent ||
          (isAdmin && (
            <>
              <DashboardCardWrapper>
                <DashboardAvgScoreCard />
              </DashboardCardWrapper>

              <DashboardCardWrapper>
                <DashboardTakenTestsCard />
              </DashboardCardWrapper>
            </>
          ))}
      </section>
    </>
  );
}
