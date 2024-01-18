import PageTitle from "@/components/PageTitle";
import HomepageRecentlyCreatedTests from "@/components/homepage/RecentlyCreatedTests/Index";

export const metadata = {
  title: {
    absolute: "Учитель Русского Языка и Литературы Котова Виктория",
  },
};

export default async function Home() {
  return (
    <>
      <PageTitle className="mb-8">Недавно созданные тесты</PageTitle>
      <HomepageRecentlyCreatedTests />
    </>
  );
}
