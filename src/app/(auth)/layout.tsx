import AuthLayoutHeader from "@/components/authLayout/Header";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen pt-20">
      <AuthLayoutHeader />
      <main className="m-auto w-full max-w-[500px] p-3">{children}</main>
    </div>
  );
}
