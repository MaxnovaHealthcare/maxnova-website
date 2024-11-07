"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface AboutProps {
  subhead_about: string;
  text_about: string;
  image_about: string;
  image_alt_about: string;
}

export default function About({
  subhead_about,
  text_about,
  image_about,
  image_alt_about,
}: AboutProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <section className="flex h-fit min-h-screen w-full items-center justify-center gap-12 overflow-hidden p-12 py-24 max-md:py-0 max-md:h-fit max-md:flex-col-reverse max-md:p-4 max-md:px-0 lg:px-10">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex h-full w-5/12 flex-col justify-center gap-12 p-4 max-md:w-full"
      >
        <h1 className="text-head font-semibold">{subhead_about}</h1>
        <p className="text-para">
          {!text_about
            ? "this is about"
            : text_about.split("|").map((para, index) => (
                <React.Fragment key={index}>
                  {para}
                  <br />
                  <br />
                </React.Fragment>
              ))}
        </p>
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative flex h-full flex-col items-end justify-start p-4 max-md:w-full max-md:p-0 lg:w-8/12"
      >
        {/* laptop */}
        <motion.h1
          ref={ref}
          style={{ x: x1 }}
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="hidden md:block z-[1] w-4/5 text-right font-humane font-bold max-md:w-full max-md:text-center max-md:text-8xl lg:-mb-16 lg:text-max"
        >
          THAT'S OUR STORY OF HOW WE GOT HERE
        </motion.h1>

        {/* phone */}
        <h1 className="block md:hidden z-[1] w-4/5 text-right font-humane font-bold text-8xl text-center max-md:w-full lg:-mb-16 lg:text-max">
          THAT'S OUR STORY OF HOW WE GOT HERE
        </h1>

        <div className="relative h-[65vh] w-[65vh] overflow-hidden rounded-3xl bg-accent1 max-md:w-full">
          <Image
            src={image_about}
            fill
            alt={image_alt_about ? image_alt_about : "Maxnova About"}
            className="object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}
