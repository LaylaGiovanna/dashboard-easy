import Image from "next/image";
import * as React from "react";
import imageLogo from "./images/easy.png";

function Logo() {
  return (
    <Image src={imageLogo} alt='Logo Easy4u' height={79} width={240} />
  )
}

export default Logo;
