"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface aboutheroprops {
  subhead: string;
  imagearr: string[];
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export default function Hero({ subhead, imagearr }: aboutheroprops) {
  const totalImages = 9;
  const adjustedImages =
    imagearr.length >= totalImages
      ? imagearr
      : Array.from(
          { length: totalImages },
          (_, i) => imagearr[i % imagearr.length],
        );

  const isMobile = useMediaQuery("(max-width: 768px)");

  let columnImages = [
    adjustedImages.slice(0, 3),
    adjustedImages.slice(3, 6),
    adjustedImages.slice(6, 9),
  ];

  if (isMobile) {
    columnImages = [adjustedImages.slice(0, 4), adjustedImages.slice(4, 8)];
  }

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center max-md:m-0 max-md:mt-16 max-md:h-screen lg:h-screen lg:p-12 lg:px-4">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex h-full w-1/2 flex-col justify-start gap-6 py-24 max-md:w-full max-md:items-center max-md:justify-center max-md:gap-4"
      >
        <h1 className="font-humane font-bold uppercase text-accent2 max-md:text-center max-md:text-8xl lg:text-max">
          All about us
        </h1>
        <p className="text-subhead font-semibold max-md:w-full max-md:text-center max-md:text-xl max-md:text-primary">
          {subhead}
        </p>
      </motion.div>
      <motion.div
        ref={ref}
        style={isMobile ? {} : { x: x1 }}
        className="z-[-1] flex h-screen min-h-screen w-3/4 gap-6 overflow-hidden max-md:absolute max-md:w-screen max-md:filter"
      >
        <div className="absolute z-[1] h-full w-full bg-accent1/60 md:hidden"></div>
        {columnImages.map((images, index) => (
          <HeroColumn
            key={index}
            images={images}
            initialY={index % 2 === 0 ? "-50%" : "0%"}
          />
        ))}
      </motion.div>
    </section>
  );
}

const HeroColumn = ({
  images,
  initialY,
}: {
  images: string[];
  initialY: string;
}) => (
  <div className="relative flex h-[120vh] w-full flex-col">
    <motion.div
      className="absolute flex h-fit w-full flex-col space-y-6"
      initial={{ y: initialY }}
      animate={{ y: initialY === "-50%" ? "0%" : "-50%" }}
      transition={{
        duration: 10,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {[...images, ...images].map((imageSrc, index) => (
        <Herocards key={index} cardKey={index} imageSrc={imageSrc} />
      ))}
    </motion.div>
  </div>
);

const Herocards = ({
  cardKey,
  imageSrc,
}: {
  cardKey: number;
  imageSrc: string;
}) => (
  <div className="relative flex aspect-[3/5] w-full flex-col items-center justify-center space-y-2 overflow-hidden rounded-3xl px-0 py-3 max-md:space-x-1 max-md:px-0">
    <Image
      src={imageSrc || "/images/a.jpeg"}
      alt={`Image ${cardKey}`}
      fill
      quality={100}
      className="z-10 overflow-hidden rounded-3xl bg-accent1 object-cover"
    />
  </div>
);
