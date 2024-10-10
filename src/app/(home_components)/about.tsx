"use client";

import React, { useRef } from "react";
import Image from "next/image";
import CTAButtons from "../buttons";
import { motion, useTransform, useScroll } from "framer-motion";

interface AboutSectionProps {
  subhead_about: string;
  text_about: string;
  image_about: string;
  image_alt_about: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  subhead_about,
  text_about,
  image_about,
  image_alt_about = "Maxnova About",
}) => {
  if (!subhead_about) {
    console.error("subhead_about is required.");
    subhead_about = "Default Subhead";
  }

  if (!text_about) {
    console.error("text_about is required.");
    text_about = "This is about";
  }

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 2], [-50, 100]);
  return (
    <section className="flex min-h-screen w-full items-center justify-center gap-12 overflow-hidden p-12 py-36 max-md:m-0 max-md:h-fit max-md:flex-col max-md:px-0 max-md:py-24 lg:px-10">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.5, ease: "easeOut" }}
        className="relative flex h-full flex-col items-start justify-start p-4 max-md:w-full max-md:p-0 lg:w-8/12"
      >
        <motion.h1
          ref={ref}
          style={{ y: y1 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.25, ease: "easeOut" }}
          className="z-[1] w-3/4 font-humane text-max font-bold text-accent2 max-md:w-full max-md:text-center max-md:text-8xl lg:-mb-16"
        >
          WHERE QUALITY IS GUARANTEED
        </motion.h1>
        <motion.div
          ref={ref}
          style={{ y: y2 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.25, ease: "easeOut" }}
          className="relative h-[65vh] w-[65vh] overflow-hidden rounded-3xl bg-accent1 max-md:w-full"
        >
          <Image
            src={image_about}
            fill
            alt={image_alt_about}
            className="object-cover object-right"
          />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.5, ease: "easeOut" }}
        className="flex h-full w-5/12 flex-col justify-center gap-12 p-4 max-md:w-full"
      >
        <h1 className="text-head">{subhead_about}</h1>
        <p className="text-para">
          {text_about.split("|").map((para, index) => (
            <React.Fragment key={index}>
              {para}
              <br />
              <br />
            </React.Fragment>
          ))}
        </p>
        <CTAButtons text="learn more" cta="/about" />
      </motion.div>
    </section>
  );
};

export default AboutSection;
