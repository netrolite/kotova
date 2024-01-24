import PageTitle from "@/components/PageTitle";
import SignUpForm from "@/components/signUp/Form";

export default async function SignUp() {
  return (
    <>
      <PageTitle className="mb-8 text-center">Создать аккаунт</PageTitle>
      <SignUpForm />
    </>
  );
}
