import Image from "next/image";
import * as React from "react";
import imageHamburguer from "./images/hamburguerIcon.png";

function Logo () {
  return <Image src={imageHamburguer} alt='teste' width={19} height={17} />
  // <img src="./logoeasy.png" alt="Minha Imagem" className="w-{210} h-{128} bg-blue"></img>
}

export default Logo;
