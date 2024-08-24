"use client";

import React from "react";
import Image from "next/image";
import CTAButtons from "../buttons";
import maxnovabanner from "../../../public/images/maxnovabanner.jpg";
import { motion } from "framer-motion";

interface AboutSectionProps {
  subhead_about: string;
  text_about: string;
  image_about?: string;
  image_alt_about?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  subhead_about,
  text_about,
  image_about = maxnovabanner, // Default image if none provided
  image_alt_about = "Maxnova About", // Default alt text if none provided
}) => {
  // Error handling for required props
  if (!subhead_about) {
    console.error("subhead_about is required.");
    subhead_about = "Default Subhead"; // Fallback value
  }

  if (!text_about) {
    console.error("text_about is required.");
    text_about = "This is about"; // Fallback value
  }

  return (
    <section className="flex h-screen min-h-screen w-full items-center justify-center gap-12 overflow-hidden p-12 max-md:h-fit max-md:flex-col max-md:p-4 max-md:px-0 lg:px-10">
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
        <div className="relative h-3/4 w-4/5 overflow-hidden rounded-3xl bg-accent1 max-md:h-[65vh] max-md:w-full">
          <Image
            src={image_about}
            fill
            alt={image_alt_about}
            className="object-cover object-right"
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
        <h1 className="text-head font-semibold">{subhead_about}</h1>
        <p className="text-para">
          {text_about.split("<br/>").map((para, index) => (
            <React.Fragment key={index}>
              {para}
              <br />
              <br />
            </React.Fragment>
          ))}
        </p>
        <CTAButtons text="learn more" cta="/about" bgcolor="bg-accent1" />
      </motion.div>
    </section>
  );
};

export default AboutSection;
