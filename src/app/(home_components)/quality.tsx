"use client";

import React, { useRef } from "react";
import Image from "next/image";
import CTAButtons from "../buttons";
import { motion, useTransform, useScroll } from "framer-motion";

interface WhereQualtiyProps {
  subhead_quality: string;
  text_quality: string;
  image_quality: string;
  image_alt_quality: string;
}

const WhereQualtiy: React.FC<WhereQualtiyProps> = ({
  subhead_quality,
  text_quality,
  image_quality,
  image_alt_quality = "Maxnova About",
}) => {
  if (!subhead_quality) {
    console.error("subhead_about is required.");
    subhead_quality = "Default Subhead";
  }

  if (!text_quality) {
    console.error("text_about is required.");
    text_quality = "This is about";
  }

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 2], [-50, 100]);

  return (
    <section
      ref={ref}
      className="flex min-h-screen w-full items-center justify-center gap-12 overflow-hidden p-12 py-36 max-md:m-0 max-md:h-fit max-md:flex-col max-md:px-0 max-md:py-24 lg:px-10"
    >
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.5, ease: "easeOut" }}
        className="relative flex h-full flex-col items-start justify-start p-4 max-md:w-full max-md:p-0 lg:w-8/12"
      >
        <motion.h1
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
          style={{ y: y2 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.25, ease: "easeOut" }}
          className="relative h-[65vh] w-[65vh] overflow-hidden rounded-3xl bg-accent1 max-md:w-full"
        >
          <Image
            src={image_quality}
            fill
            alt={image_alt_quality}
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
        <h1 className="text-head">{subhead_quality}</h1>
        <p className="text-para">
          {text_quality.split("|").map((para, index) => (
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

export default WhereQualtiy;
