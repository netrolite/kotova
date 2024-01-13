import { db } from "@/lib/db";
import Image from "next/image";

export const metadata = {
  title: {
    absolute: "Учитель Русского Языка и Литературы Котова Виктория",
  },
};

export default async function Home() {
  const result = (
    await db.test.findMany({
      include: { questions: { include: { options: true } } },
    })
  )[0];
  console.log(result);
  return (
    <>
      <h1 className="text-xl font-black">Добрый день</h1>
      <h2 className="text-xl font-bold">Добро пожаловать в якласс</h2>
      <Image alt="bird" src={"/bird.jpg"} width={400} height={300} />
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae id
      debitis saepe facere ab eum exercitationem voluptatem nam error ratione
      adipisci molestiae quis ex enim dolores laudantium libero voluptate
      accusantium fugit modi voluptas, consequatur, soluta animi impedit.
      Obcaecati, quis nulla illum perspiciatis quaerat natus temporibus rerum
      suscipit modi amet minus culpa velit id molestias, commodi aliquid
      provident. Molestiae totam suscipit excepturi odit soluta deserunt
      consequatur recusandae, perferendis aspernatur exercitationem dicta!
      Repudiandae facilis dignissimos sequi recusandae eos sint ipsa, distinctio
      quae eligendi iure quasi ullam cum cumque quas fugiat. Eius magni nemo
      earum architecto reprehenderit dolores, quas minus, fuga, iure quaerat
      quam laudantium dignissimos mollitia ad quis enim! Omnis doloremque
      aperiam laudantium maxime eveniet sint sequi expedita, temporibus corrupti
      impedit consequatur officiis unde est molestiae. Veniam vel laboriosam
      esse a neque. Eius amet fuga quos aperiam officia porro vitae quaerat,
      ipsam quidem ea quo sit animi maxime dolore obcaecati minima doloremque
      magnam rem unde eveniet voluptatibus quasi! Dolorum ad libero ut ex velit
      vitae, quasi at autem ipsam delectus eligendi nisi modi nemo consequatur
      recusandae maxime rem? Id repudiandae modi consequatur, quisquam provident
      corrupti vero illo quam magni blanditiis rem, aperiam ipsa earum neque in
      debitis fugiat voluptatibus vel vitae libero. Lorem ipsum dolor sit, amet
      consectetur adipisicing elit. Recusandae id debitis saepe facere ab eum
      exercitationem voluptatem nam error ratione adipisci molestiae quis ex
      enim dolores laudantium libero voluptate accusantium fugit modi voluptas,
      consequatur, soluta animi impedit. Obcaecati, quis nulla illum
      perspiciatis quaerat natus temporibus rerum suscipit modi amet minus culpa
      velit id molestias, commodi aliquid provident. Molestiae totam suscipit
      excepturi odit soluta deserunt consequatur recusandae, perferendis
      aspernatur exercitationem dicta! Repudiandae facilis dignissimos sequi
      recusandae eos sint ipsa, distinctio quae eligendi iure quasi ullam cum
      cumque quas fugiat. Eius magni nemo earum architecto reprehenderit
      dolores, quas minus, fuga, iure quaerat quam laudantium dignissimos
      mollitia ad quis enim! Omnis doloremque aperiam laudantium maxime eveniet
      sint sequi expedita, temporibus corrupti impedit consequatur officiis unde
      est molestiae. Veniam vel laboriosam esse a neque. Eius amet fuga quos
      aperiam officia porro vitae quaerat, ipsam quidem ea quo sit animi maxime
      dolore obcaecati minima doloremque magnam rem unde eveniet voluptatibus
      quasi! Dolorum ad libero ut ex velit vitae, quasi at autem ipsam delectus
      eligendi nisi modi nemo consequatur recusandae maxime rem? Id repudiandae
      modi consequatur, quisquam provident corrupti vero illo quam magni
      blanditiis rem, aperiam ipsa earum neque in debitis fugiat voluptatibus
      vel vitae libero. Lorem ipsum dolor sit, amet consectetur adipisicing
      elit. Recusandae id debitis saepe facere ab eum exercitationem voluptatem
      nam error ratione adipisci molestiae quis ex enim dolores laudantium
      libero voluptate accusantium fugit modi voluptas, consequatur, soluta
      animi impedit. Obcaecati, quis nulla illum perspiciatis quaerat natus
      temporibus rerum suscipit modi amet minus culpa velit id molestias,
      commodi aliquid provident. Molestiae totam suscipit excepturi odit soluta
      deserunt consequatur recusandae, perferendis aspernatur exercitationem
      dicta! Repudiandae facilis dignissimos sequi recusandae eos sint ipsa,
      distinctio quae eligendi iure quasi ullam cum cumque quas fugiat. Eius
      magni nemo earum architecto reprehenderit dolores, quas minus, fuga, iure
      quaerat quam laudantium dignissimos mollitia ad quis enim! Omnis
      doloremque aperiam laudantium maxime eveniet sint sequi expedita,
      temporibus corrupti impedit consequatur officiis unde est molestiae.
      Veniam vel laboriosam esse a neque. Eius amet fuga quos aperiam officia
      porro vitae quaerat, ipsam quidem ea quo sit animi maxime dolore obcaecati
      minima doloremque magnam rem unde eveniet voluptatibus quasi! Dolorum ad
      libero ut ex velit vitae, quasi at autem ipsam delectus eligendi nisi modi
      nemo consequatur recusandae maxime rem? Id repudiandae modi consequatur,
      quisquam provident corrupti vero illo quam magni blanditiis rem, aperiam
      ipsa earum neque in debitis fugiat voluptatibus vel vitae libero. Lorem
      ipsum dolor sit, amet consectetur adipisicing elit. Recusandae id debitis
      saepe facere ab eum exercitationem voluptatem nam error ratione adipisci
      molestiae quis ex enim dolores laudantium libero voluptate accusantium
      fugit modi voluptas, consequatur, soluta animi impedit. Obcaecati, quis
      nulla illum perspiciatis quaerat natus temporibus rerum suscipit modi amet
      minus culpa velit id molestias, commodi aliquid provident. Molestiae totam
      suscipit excepturi odit soluta deserunt consequatur recusandae,
      perferendis aspernatur exercitationem dicta! Repudiandae facilis
      dignissimos sequi recusandae eos sint ipsa, distinctio quae eligendi iure
      quasi ullam cum cumque quas fugiat. Eius magni nemo earum architecto
      reprehenderit dolores, quas minus, fuga, iure quaerat quam laudantium
      dignissimos mollitia ad quis enim! Omnis doloremque aperiam laudantium
      maxime eveniet sint sequi expedita, temporibus corrupti impedit
      consequatur officiis unde est molestiae. Veniam vel laboriosam esse a
      neque. Eius amet fuga quos aperiam officia porro vitae quaerat, ipsam
      quidem ea quo sit animi maxime dolore obcaecati minima doloremque magnam
      rem unde eveniet voluptatibus quasi! Dolorum ad libero ut ex velit vitae,
      quasi at autem ipsam delectus eligendi nisi modi nemo consequatur
      recusandae maxime rem? Id repudiandae modi consequatur, quisquam provident
      corrupti vero illo quam magni blanditiis rem, aperiam ipsa earum neque in
      debitis fugiat voluptatibus vel vitae libero.
    </>
  );
}
