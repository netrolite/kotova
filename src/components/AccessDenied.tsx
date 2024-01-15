import BackBtn from "@/components/BackBtn";
import PageTitle from "@/components/PageTitle";

export default function AccessDenied() {
  return (
    <>
      <PageTitle className="mb-4">У вас нет доступа к этой странице</PageTitle>
      <BackBtn />
    </>
  );
}
