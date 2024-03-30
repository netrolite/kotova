import ProfileImg from "../../../../images/certificate1.webp";

import Certificate1 from "../../../../images/certificate1.webp";
import Certificate2 from "../../../../images/certificate2.webp";
import Certificate3 from "../../../../images/certificate3.webp";
import Certificate4 from "../../../../images/certificate4.webp";
import Certificate5 from "../../../../images/certificate5.webp";
import Certificate6 from "../../../../images/certificate6.webp";
import Certificate7 from "../../../../images/certificate7.webp";
import Certificate8 from "../../../../images/certificate8.webp";
import Certificate9 from "../../../../images/certificate9.webp";
import Certificate10 from "../../../../images/certificate10.webp";
import Certificate11 from "../../../../images/certificate11.webp";

import StudentCertificate1 from "../../../../images/studentCertificate1.webp";
import StudentCertificate2 from "../../../../images/studentCertificate2.webp";
import StudentCertificate3 from "../../../../images/studentCertificate3.webp";
import StudentCertificate4 from "../../../../images/studentCertificate4.webp";
import StudentCertificate5 from "../../../../images/studentCertificate5.webp";
import StudentCertificate6 from "../../../../images/studentCertificate6.webp";

import Testimonial1 from "../../../../images/testimonial1.webp";
import Testimonial2 from "../../../../images/testimonial2.webp";
import Testimonial3 from "../../../../images/testimonial3.webp";
import Testimonial4 from "../../../../images/testimonial4.webp";
import Testimonial5 from "../../../../images/testimonial5.webp";
import Testimonial6 from "../../../../images/testimonial6.webp";

import Image from "next/image";
import AboutImagesSection from "@/components/dashboard/about/ImagesSection";

const IMAGES = {
  certificates: [
    Certificate1,
    Certificate2,
    Certificate3,
    Certificate4,
    Certificate5,
    Certificate6,
    Certificate7,
    Certificate8,
    Certificate9,
    Certificate10,
    Certificate11,
  ],
  studentCertificates: [
    StudentCertificate1,
    StudentCertificate2,
    StudentCertificate3,
    StudentCertificate4,
    StudentCertificate5,
    StudentCertificate6,
  ],
  testimonials: [
    Testimonial1,
    Testimonial2,
    Testimonial3,
    Testimonial4,
    Testimonial5,
    Testimonial6,
  ],
};

export default function About() {
  console.log(Testimonial6);

  return (
    <>
      <h1 className="mb-14 text-4xl font-medium">О сайте</h1>
      <section>
        <div className="relative m-auto mb-4 aspect-square max-w-[400px] overflow-hidden rounded-full border border-gray-300">
          <Image alt="Фото Виктории Альбертовны" src={ProfileImg} />
        </div>
        <div className="mb-24 text-center">
          <h2 className="text-2xl font-semibold">Котова Виктория</h2>
          <h3 className="text-secondary-foreground">
            Учитель русского языка и литературы
          </h3>
        </div>
      </section>

      <section className="flex flex-col gap-16">
        <AboutImagesSection
          name="Мои дипломы, сертификаты и грамоты"
          images={IMAGES.certificates}
        />

        <AboutImagesSection
          name="Дипломы, сертификаты и грамоты моих учеников"
          images={IMAGES.studentCertificates}
        />

        <AboutImagesSection
          name="Мои письма благодарности и рекомендации"
          images={IMAGES.testimonials}
        />
      </section>
    </>
  );
}
