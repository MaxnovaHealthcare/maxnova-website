"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

function Verticals() {
  const verticals = [
    {
      name: "Ayurveda",
      image: "/images/a.jpeg",
    },
    {
      name: "Cosmetics",
      image: "/images/a.jpeg",
    },
    {
      name: "Nutraceuticals",
      image: "/images/a.jpeg",
    },
    {
      name: "Pharmaceuticals",
      image: "/images/a.jpeg",
    },
  ];

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -100]);

  return (
    <section
      ref={ref}
      className="relative flex h-auto w-full flex-col gap-6 p-12 py-24 max-md:p-4 max-md:px-0 lg:px-10"
    >
      <motion.h1
        style={{ y: y1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5, ease: "linear" }}
        className="z-[3] font-humane text-max font-bold uppercase text-accent2 max-md:w-full max-md:text-center max-md:text-8xl"
      >
        We Operate in <br /> Various Verticals
      </motion.h1>
      <div className="flex w-full items-center justify-center">
        <div className="grid w-fit grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-2">
          {verticals.map((vertical, index) => (
            <VerticalCard
              key={index}
              name={vertical.name}
              image={vertical.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface cardProps {
  name: string;
  image: string;
}
const VerticalCard = ({ name, image }: cardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.025 }}
      transition={{ duration: 0.25, ease: "linear" }}
      className="relative flex h-[20.625rem] w-[30rem] items-center justify-center overflow-hidden rounded-3xl p-8 text-primary max-md:h-[65vh] max-md:w-full max-md:p-4"
    >
      <Image
        src={image}
        alt={`${name} vertical`}
        fill
        className="z-[0] h-full w-full object-cover"
      />
      <h1 className="z-[1] text-center font-humane text-8xl font-medium uppercase max-md:text-7xl">
        {name}
      </h1>
    </motion.div>
  );
};

export default Verticals;

/*

function VerticalObjects({ name, image, reverse }: objectprops) {
  const reverseclass = reverse ? "row-reverse" : "row";
  const textheight = useRef<HTMLHeadingElement>(null);
  const height = Number(textheight.current?.clientHeight) - 10;
  console.log(height);
  return (
    <div
      className="relative flex h-fit w-full items-start justify-between gap-12"
      style={{ flexDirection: `${reverseclass}` }}
    >
      <h1
        ref={textheight}
        className="h-fit font-humane text-max font-semibold uppercase"
      >
        {name}
      </h1>
      <div
        className="relative m-0 h-fit w-full overflow-hidden rounded-2xl p-0"
        style={{ width: "100%", height: `${height}px` }}
      >
        <Image src={image} alt={name} fill className="w-full object-cover" />
      </div>
    </div>
  );
}

*/
