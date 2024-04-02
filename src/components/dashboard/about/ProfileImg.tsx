"use client";

import ProfileImg from "../../../../images/certificate1.webp";
import Zoom from "react-medium-image-zoom-fixed";
import Image from "next/image";

export default function AboutProfileImg() {
  return (
    <Zoom>
      <Image alt="Фото Виктории Альбертовны" src={ProfileImg} />
    </Zoom>
  );
}
