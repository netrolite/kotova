import BackBtn from "@/components/BackBtn";
import PageTitle from "@/components/PageTitle";
import MainLayout from "./(main)/layout";

export default function NotFound() {
  return (
    <MainLayout>
      <PageTitle>Страница не найдена</PageTitle>
      <p className="mb-4">Возможно, вы перешли по нерабочей ссылке.</p>
      <BackBtn />
    </MainLayout>
  );
}
