import PageTitle from "@/components/PageTitle";
import DashboardCardWrapper from "@/components/routes/users/my/Card/Wrapper";
import DashboardSubjectsCard from "@/components/routes/users/my/Cards/Subjects";
import DashboardTestsCard from "@/components/routes/users/my/Cards/Tests";

export default async function Dashboard() {
  return (
    <>
      <PageTitle className="mb-8">Личный кабинет</PageTitle>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DashboardCardWrapper card={<DashboardTestsCard />} />
        <DashboardCardWrapper card={<DashboardSubjectsCard />} />
      </section>
    </>
  );
}
