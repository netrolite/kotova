import Image, { StaticImageData } from "next/image";

type Props = {
  name: string;
  images: StaticImageData[];
};

export default function AboutImagesSection({ name, images }: Props) {
  return (
    <div>
      <h2 className="mb-6 text-center text-2xl font-semibold">{name}</h2>
      <div className="flex flex-col gap-4">
        {images.map((img, i) => (
          <div
            key={i}
            className="overflow-hidden rounded border border-gray-300"
          >
            <Image src={img} alt="Сертификат" />
          </div>
        ))}
      </div>
    </div>
  );
}
