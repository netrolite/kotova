import PageTitle from "@/components/PageTitle";
import DashboardCardSkeleton from "@/components/routes/users/my/Card/Skeleton";
import DashboardCardWrapper from "@/components/routes/users/my/Card/Wrapper";
import DashboardTestsCard from "@/components/routes/users/my/Cards/Tests";

type Props = {};

export default async function Dashboard({}: Props) {
  return (
    <>
      <PageTitle className="mb-8">Личный кабинет</PageTitle>
      <section>
        <DashboardCardWrapper card={<DashboardTestsCard />} />
        <DashboardCardSkeleton />
      </section>
    </>
  );
}
