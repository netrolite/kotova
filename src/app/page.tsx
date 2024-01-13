import { db } from "@/lib/db";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: {
    absolute: "Учитель Русского Языка и Литературы Котова Виктория",
  },
};

export default async function Home() {
  return (
    <>
      <h1 className="text-xl font-black">Учитель Русского Языка и Литературы Котова Виктория</h1>
      <Image alt="bird" src={"/bird.jpg"} width={400} height={300} />
      <Input />
    </>
  );
}
