"use client";

import ProfileImg from "../../../../images/profileImg.jpeg";
import Zoom from "react-medium-image-zoom-fixed";
import Image from "next/image";

export default function AboutProfileImg() {
  return (
    <Zoom>
      <Image alt="Фото Виктории Альбертовны" src={ProfileImg} />
    </Zoom>
  );
}
