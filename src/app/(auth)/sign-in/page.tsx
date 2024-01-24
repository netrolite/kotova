import PageTitle from "@/components/PageTitle";
import SignInForm from "@/components/signIn/Form";

export default async function SignIn() {
  return (
    <>
      <PageTitle className="mb-8 text-center">Войти в аккаунт</PageTitle>
      <SignInForm />
    </>
  );
}
