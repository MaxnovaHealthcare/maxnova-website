"use client";

import React from "react";
import Image from "next/image";
import CTAButtons from "../buttons";
import maxnovabanner from "../../../public/images/maxnovabanner.jpg";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="flex h-screen min-h-screen w-full items-center justify-center gap-12 overflow-hidden p-12 max-md:h-fit max-md:flex-col max-md:p-4 lg:px-10">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.5, ease: "easeOut" }}
        className="relative flex h-full flex-col items-start justify-start p-4 max-md:w-full max-md:p-0 lg:w-8/12"
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.25, ease: "easeOut" }}
          className="z-[1] w-3/4 font-humane text-max font-bold max-md:w-full max-md:text-center max-md:text-8xl lg:-mb-16"
        >
          WHERE QUALITY IS GUARANTEED
        </motion.h1>
        <div className="h-3/4 w-4/5 overflow-hidden rounded-3xl bg-accent1 max-md:h-[65vh] max-md:w-full">
          <Image
            src={maxnovabanner}
            alt="banner"
            className="h-full w-full scale-125 object-cover object-right"
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.5, ease: "easeOut" }}
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
        <CTAButtons text="learn more" cta="/about" bgcolor="bg-accent1" />
      </motion.div>
    </section>
  );
}
