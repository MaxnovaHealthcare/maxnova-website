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
  const x1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  return (
    <section className="flex h-fit min-h-screen w-full items-center justify-center gap-12 overflow-hidden p-12 py-36 max-md:my-24 max-md:h-fit max-md:w-full max-md:flex-col-reverse max-md:p-0 lg:px-10">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex h-full w-5/12 flex-col justify-center gap-12 max-md:w-full"
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
        className="relative flex h-full flex-col items-end justify-start max-md:w-full max-md:p-0 lg:w-8/12"
      >
        <motion.h1
          ref={ref}
          style={{ x: x1 }}
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="z-[1] w-4/5 text-right font-humane font-bold uppercase text-accent2 max-md:w-full max-md:text-center max-md:text-8xl lg:text-max"
        >
          {`Our team and infrastructure`}
        </motion.h1>
        <div className="relative aspect-[5/4] h-auto w-[45rem] overflow-hidden rounded-3xl bg-accent1 max-md:w-full">
          <Image
            src={image_about}
            fill
            quality={100}
            alt={image_alt_about ? image_alt_about : "Maxnova About"}
            className="object-cover object-center"
          />
        </div>
      </motion.div>
    </section>
  );
}
