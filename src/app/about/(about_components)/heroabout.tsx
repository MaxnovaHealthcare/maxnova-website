"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface aboutheroprops {
  subhead: string;
  imagearr: string[];
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

  const columnImages = [
    adjustedImages.slice(0, 3),
    adjustedImages.slice(3, 6),
    adjustedImages.slice(6, 9),
  ];

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center max-md:m-0 max-md:mt-16 max-md:h-screen lg:h-screen lg:p-12 lg:px-4">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex h-full w-1/2 flex-col justify-start gap-8 py-12 max-md:w-full max-md:items-center max-md:justify-center max-md:gap-4"
      >
        <h1 className="font-humane font-bold uppercase max-md:text-center max-md:text-8xl lg:text-max">
          WHERE QUALITY IS GUARANTEED
        </h1>
        <p className="w-3/5 text-head font-semibold max-md:w-full max-md:text-center">
          {subhead}
        </p>
      </motion.div>
      <div className="flex h-screen min-h-screen w-3/4 gap-4 overflow-hidden max-md:hidden">
        {columnImages.map((images, index) => (
          <HeroColumn
            key={index}
            images={images}
            initialY={index % 2 === 0 ? "-50%" : "0%"}
          />
        ))}
      </div>
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
        duration: 5,
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
  <div className="relative flex h-[42vh] w-full flex-col items-center justify-center space-y-2 overflow-hidden rounded-3xl px-0 py-2 max-md:px-0">
    <Image
      src={imageSrc}
      alt={`Image ${cardKey}`}
      fill
      className="z-10 overflow-hidden rounded-3xl bg-accent1 object-cover"
    />
  </div>
);
