import FormItemField from "./ItemField";
import { FormControl, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useFormContext } from "react-hook-form";
import { SignInSchemaType } from "@/lib/zod/schemas/SignIn";

type Props = {};

export default function SignInFormPasswordInput({}: Props) {
  const { control } = useFormContext<SignInSchemaType>();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormItemField
      control={control}
      name="password"
      render={({ field }) => (
        <>
          <FormLabel>Пароль</FormLabel>
          <div className="relative flex gap-1">
            <FormControl>
              <Input {...field} type={showPassword ? "text" : "password"} />
            </FormControl>
            <Button
              variant="outline"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              title={showPassword ? "Скрыть пароль" : "Показать пароль"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
          </div>
          <FormMessage />
        </>
      )}
    />
  );
}
