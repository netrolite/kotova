import { SignInSchemaType } from "@/lib/zod/schemas/SignIn";
import { useFormContext } from "react-hook-form";

export default function useSignInFormContext() {
  return useFormContext<SignInSchemaType>();
}
