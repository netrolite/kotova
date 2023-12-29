import Link from "next/link";

export const metadata = {
  title: {
    absolute: "Учитель Русского Языка и Литературы Котова Виктория",
  },
};

export default async function Home() {
  return (
    <>
      <h1>Home page</h1>
      <Link href="/protected">Protected page</Link>
    </>
  );
}
