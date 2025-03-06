"use client";

import React, { useRef } from "react";
import Image from "next/image";
import CTAButtons from "../buttons";
import { motion, useTransform, useScroll } from "framer-motion";

interface WhereQualityProps {
  subhead_quality?: string;
  text_quality?: string;
  image_quality: string;
  image_alt_quality?: string;
}

const WhereQuality: React.FC<WhereQualityProps> = ({
  subhead_quality = "Default Subhead",
  text_quality = "This is about",
  image_quality,
  image_alt_quality = "Maxnova About",
}) => {
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
      className="flex min-h-screen w-full items-center justify-center overflow-hidden p-12 py-36 max-md:h-fit max-md:flex-col max-md:px-4 max-md:py-24 lg:px-10"
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
          className="z-[1] w-3/4 font-humane text-max font-bold uppercase text-accent2 max-md:w-full max-md:text-center max-md:text-8xl lg:-mb-16"
        >
          Uncompromising Product Quality
        </motion.h1>

        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.25, ease: "easeOut" }}
          className="relative aspect-[5/4] w-[42rem] overflow-hidden rounded-3xl bg-accent1 max-md:w-full"
        >
          <Image
            src={image_quality}
            fill
            quality={100}
            priority
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
        className="flex h-full w-5/12 flex-col justify-center gap-12 p-4 max-md:m-0 max-md:w-full max-md:p-0"
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

export default WhereQuality;
