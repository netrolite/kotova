import { db } from "@/lib/db";
import Image from "next/image";

export const metadata = {
  title: {
    absolute: "Учитель Русского Языка и Литературы Котова Виктория",
  },
};

export default async function Home() {
  return (
    <>
      <h1 className="text-xl font-black">
        Учитель Русского Языка и Литературы Котова Виктория
      </h1>
      <Image alt="bird" src={"/bird.jpg"} width={400} height={300} />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum odit
      voluptatem debitis quidem architecto quod iste consequatur, ab hic qui
      eligendi. Exercitationem, cum eaque fuga neque voluptatum eligendi ut,
      maxime optio tempore a voluptate corporis possimus quis molestiae beatae
      sint eum magni labore, expedita enim obcaecati necessitatibus? Dolore
      laboriosam, harum ut, reiciendis vero dolor quod numquam, eveniet tempore
      voluptas minima! Quo temporibus doloribus saepe voluptas soluta quae
      eveniet debitis dolorem, dignissimos et animi esse praesentium rem nisi
      repellat, enim ab! Vitae necessitatibus, ea recusandae eum, ex,
      perspiciatis est voluptatibus rem facere autem expedita? Consequuntur
      commodi dolores veniam fugiat rem provident! Lorem ipsum dolor sit, amet
      consectetur adipisicing elit. Alias earum blanditiis sapiente suscipit
      eum, qui doloremque, quod impedit, eos temporibus facilis. Magni iure
      porro incidunt voluptatum tenetur consequuntur magnam eos, possimus velit
      sint maiores libero illo voluptatibus odit rerum hic sed rem nobis optio
      minus nostrum! Doloremque sint totam provident omnis pariatur ipsam
      numquam minima ratione culpa iure corporis natus, nobis, et, eligendi
      distinctio dignissimos delectus voluptates voluptas. Beatae provident
      nostrum obcaecati possimus totam excepturi error explicabo magni expedita
      quod. Nam numquam vel fugiat debitis, nihil expedita quaerat
      reprehenderit. Labore ipsum libero repellendus fugit consequatur animi.
      Atque, sequi. Atque, debitis.
    </>
  );
}
