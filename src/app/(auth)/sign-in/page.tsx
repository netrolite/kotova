import PageTitle from "@/components/PageTitle";
import SignInForm from "@/components/signIn/Form";

export default function SignIn() {
  return (
    <>
      <PageTitle className="mb-8">Войти в аккаунт</PageTitle>
      <SignInForm />
    </>
  );
}
