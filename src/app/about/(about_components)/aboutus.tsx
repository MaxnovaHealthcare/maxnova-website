"use client";

import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="flex h-screen min-h-screen w-full items-center justify-center gap-12 overflow-hidden p-12 max-md:my-24 max-md:h-fit max-md:flex-col-reverse max-md:p-4 max-md:px-0 lg:px-10">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex h-full w-4/12 flex-col justify-center gap-12 p-4 max-md:w-full"
      >
        <h1 className="text-head font-semibold">
          All the credits goes to each person working in the backend day and
          night for us.
        </h1>
        <p className="text-para">
          Maxnova group of companies is committed to delivering happiness in the
          form of &rsquo;good health&rsquo; in everyone&rsquo;s home.
          <br />
          <br />
          In the preceding years, Maxnova group of companies has encountered a
          massive growth rate which defines our strong presence in the
          industry.We are a leading manufacturer of high-quality Herbal
          Cosmetics, Nutraceuticals and Ayurvedic Beauty Products.
          <br />
          <br />
          Every time we put our extensive efforts into introducing the
          first-class cosmetic product, we are always in search of understanding
          your necessity.
        </p>
      </motion.div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative flex h-full flex-col items-end justify-start p-4 max-md:w-full max-md:p-0 lg:w-8/12"
      >
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="z-[1] w-3/4 text-right font-humane font-bold max-md:w-full max-md:text-center max-md:text-8xl lg:-mb-16 lg:text-max"
        >
          {`THAT'S OUR STORY OF HOW WE GOT HERE`}
        </motion.h1>
        <div className="h-3/4 w-4/5 rounded-3xl bg-accent1 max-md:h-[65vh] max-md:w-full">
          y
        </div>
      </motion.div>
    </section>
  );
}
