"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface AboutBriefProps {
  image1_about: string;
  image2_about: string;
  image1_alt_about: string;
  image2_alt_about: string;
  subhead_about: string;
  text_about: string;
}

const AboutBrief: React.FC<AboutBriefProps> = ({
  image1_about,
  image1_alt_about,
  image2_about,
  image2_alt_about,
  subhead_about,
  text_about,
}) => {
  const about_heading = "this is what we are all about";
  const ref1 = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref1,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const img1move = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const img2move = useTransform(scrollYProgress, [0, 1], [-100, 50]);

  const spaceIndex =
    about_heading.lastIndexOf(" ", Math.floor(about_heading.length / 2)) || 0;
  const firstPart = about_heading.slice(0, spaceIndex);
  const secondPart = about_heading.slice(spaceIndex + 1);

  return (
    <section
      ref={ref1}
      className="flex min-h-screen w-full flex-col items-center justify-start gap-12 p-12 py-36 max-md:m-0 max-md:h-fit max-md:flex-col max-md:px-0 max-md:py-24 lg:px-12"
    >
      <div className="relative -mb-12 flex w-full flex-col text-accent2">
        <motion.h1
          style={{ x: x1 }}
          className="font-humane font-bold uppercase text-accent2 max-md:text-8xl lg:text-max"
        >
          {firstPart}
          <br />
          {secondPart}
        </motion.h1>
      </div>
      <div className="flex w-full flex-row">
        <TextSide subhead_about={subhead_about} text_about={text_about} />
        <ImageSide
          img1={image1_about}
          img2={image2_about}
          img1_alt={image1_alt_about}
          img2_alt={image2_alt_about}
          imagey1={img1move}
          imagey2={img2move}
        />
      </div>
    </section>
  );
};

interface ImageSideProps {
  img1: string;
  img1_alt: string;
  img2: string;
  img2_alt: string;
  imagey1: any;
  imagey2: any;
}

const ImageSide: React.FC<ImageSideProps> = ({
  img1,
  img1_alt,
  img2,
  img2_alt,
  imagey1,
  imagey2,
}) => (
  <section className="relative flex w-3/5 items-end justify-end">
    <motion.div
      className="absolute -top-10 left-0 h-[50%] min-h-[40vh] w-[75%]"
      style={{ y: imagey1 }}
    >
      <Image
        src={img2}
        alt={img2_alt}
        fill
        className="rounded-2xl object-cover"
      />
    </motion.div>
    <motion.div
      className="absolute bottom-0 right-10 aspect-[4/5] h-auto w-[24rem]"
      style={{ y: imagey2 }}
    >
      <Image
        src={img1}
        alt={img1_alt}
        fill
        className="h-full w-full rounded-3xl object-cover"
      />
    </motion.div>
  </section>
);

interface TextSideProps {
  subhead_about: string;
  text_about: string;
}

const TextSide: React.FC<TextSideProps> = ({ subhead_about, text_about }) => (
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.75, delay: 0.5, ease: "easeOut" }}
    className="flex h-full w-2/5 flex-col justify-center gap-6 p-4 max-md:w-full"
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
  </motion.div>
);

export default AboutBrief;
