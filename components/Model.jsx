import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

export default function Model(props) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="h-screen w-screen flex items-center justify-center flex-row bg-white">
      <div className="container h-full w-full px-6 py-24 flex flex-row items-center justify-center">
        <div className="flex justify-center items-center">{props.children}</div>
      </div>
      {windowWidth > 1280 && (
        <div className="flex items-center justify-center container h-full w-3/4 flex-row bg-background-inital relative bg-beige">
          <Image
            src={props.image.url}
            alt={props.image.alt}
            width={props.image.width}
            height={props.image.height}
           // className="w-full h-auto absolute bottom-40 -left-35 mx-auto sm:max-w-sm sm:mx-auto md:max-w-full lg:w-1/2 xl:w-2/5 2xl:w-3/10"
           className="w-full h-full"

         />
        </div>
      )}
    </section>
  );
}