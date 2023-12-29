import { Button } from "@/components/ui/button";
import signInAction from "@/lib/actions/signIn";

export default function HeaderSignInBtn() {
  return (
    <form action={signInAction}>
      <Button>Войти</Button>
    </form>
  );
}
