import PageTitle from "@/components/PageTitle";
import SignUpForm from "@/components/signUp/Form";

export default function SignUp() {
  return (
    <>
      <PageTitle className="mb-8">Создать аккаунт</PageTitle>
      <SignUpForm />
    </>
  );
}
