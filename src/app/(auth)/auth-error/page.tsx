import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthError() {
  return (
    <>
      <PageTitle>Произошла ошибка при входе в аккаунт</PageTitle>
      <p className="mb-4 text-muted-foreground">Приносим свои извинения</p>
      <Link href="/?hideBackBtn=">
        <Button>Вернуться на главную</Button>
      </Link>
    </>
  );
}
