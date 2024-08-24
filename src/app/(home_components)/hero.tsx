"use client";

import React from "react";
import { motion } from "framer-motion";
import Splinediv from "./spline";

interface HeroSectionProps {
  head_hero: string;
  spline_hero: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  head_hero,
  spline_hero,
}) => {
  if (!head_hero) {
    console.error("head_hero is required.");
    head_hero = "Default Headline";
  }

  if (!spline_hero) {
    console.error("spline_hero is required.");
    spline_hero = "";
  }

  const spaceIndex = head_hero.lastIndexOf(
    " ",
    Math.floor(head_hero.length / 2),
  );
  const firstPart =
    spaceIndex !== -1 ? head_hero.slice(0, spaceIndex) : head_hero;
  const secondPart = spaceIndex !== -1 ? head_hero.slice(spaceIndex + 1) : "";

  return (
    <section className="bg-prim flex h-screen min-h-screen w-full flex-col items-center justify-center p-12 px-4 max-md:mt-12 max-md:h-[50vh] max-md:p-4 max-md:px-0 lg:mt-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "linear" }}
        className="relative m-0 flex h-full w-full items-center justify-center bg-accent1 p-0 max-md:rounded-2xl md:overflow-hidden md:rounded-3xl"
      >
        <Splinediv url={spline_hero} />
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="bottom-0 left-0 w-full overflow-hidden text-wrap p-6 font-humane text-max font-bold uppercase max-md:text-8xl md:absolute md:w-2/3"
        >
          {firstPart}
          <br />
          {secondPart}
        </motion.h1>
      </motion.div>
    </section>
  );
};

export default HeroSection;
