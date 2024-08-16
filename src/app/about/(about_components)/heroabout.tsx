"use client";

import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center max-md:m-0 max-md:mt-20 max-md:h-screen lg:h-screen lg:p-12 lg:px-4">
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
          All the credits goes to each person working in the backend day and
          night for us.
        </p>
      </motion.div>
      <div className="flex h-screen min-h-screen w-3/4 gap-4 overflow-hidden max-md:hidden">
        {[...Array(3)].map((_, index) => (
          <HeroColumn key={index} initialY={index % 2 === 0 ? "-50%" : "0%"} />
        ))}
      </div>
    </section>
  );
};

const HeroColumn = ({ initialY }: { initialY: string }) => (
  <div className="relative flex h-[120vh] w-full flex-col">
    <motion.div
      className="absolute flex h-fit w-full flex-col"
      initial={{ y: initialY }}
      animate={{ y: initialY === "-50%" ? "0%" : "-50%" }}
      transition={{
        duration: 5,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {[...Array(6)].map((_, index) => (
        <Herocards key={index} />
      ))}
    </motion.div>
  </div>
);

const Herocards = () => (
  <div className="flex h-[42vh] w-full flex-col items-center justify-center overflow-hidden rounded-3xl px-0 py-2">
    <div className="flex h-full w-full rounded-3xl bg-accent1">abv</div>
  </div>
);

export default Hero;
