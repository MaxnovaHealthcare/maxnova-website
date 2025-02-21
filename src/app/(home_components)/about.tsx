"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface AboutBriefprops {
  image1_about: string;
  image2_about: string;
  image1_alt_about: string;
  image2_alt_about: string;
  subhead_about: string;
  text_about: string;
}
const AboutBrief = ({
  image1_about,
  image1_alt_about,
  image2_about,
  image2_alt_about,
  subhead_about,
  text_about,
}: AboutBriefprops) => {
  const about_heading = "this is what we are all about";
  const ref1 = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref1,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [1, 0], [-150, -50]);
  const img1move = useTransform(scrollYProgress, [0, 1], [-50, 100]);
  const img2move = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const spaceIndex =
    about_heading.lastIndexOf(" ", Math.floor(about_heading.length / 2)) ?? 0;
  const firstPart = about_heading.slice(0, spaceIndex);
  const secondPart = about_heading.slice(spaceIndex + 1);
  return (
    <section
      ref={ref1}
      className="flex min-h-screen w-full flex-col items-center justify-start gap-12 p-12 py-36 max-md:m-0 max-md:h-fit max-md:flex-col max-md:px-0 max-md:py-24 lg:px-10"
    >
      <div className="relative flex w-full flex-col items-end justify-end text-accent2">
        <motion.h1
          style={{ x: x1 }}
          className="text-right font-humane font-bold uppercase max-md:text-8xl lg:text-max"
        >
          {firstPart}
          <br />
          {secondPart}
        </motion.h1>
      </div>
      <div className="flex w-full flex-row">
        <Textside subhead_about={subhead_about} text_about={text_about} />
        <Imageside
          img2={image1_about}
          img1={image2_about}
          img1_alt={image1_alt_about}
          img2_alt={image2_alt_about}
          imagey2={img1move}
          imagey={img2move}
        />
      </div>
    </section>
  );
};

interface Imagesideprops {
  img1: string;
  img1_alt: string;
  img2: string;
  img2_alt: string;
  imagey2: any;
  imagey: any;
}
const Imageside = ({
  img1,
  img1_alt,
  img2,
  img2_alt,
  imagey2,
  imagey,
}: Imagesideprops) => {
  return (
    <section className="relative flex w-3/5">
      <motion.div
        className="absolute -top-10 left-0 h-[50%] min-h-[40vh] w-[75%]"
        style={{ y: imagey }}
      >
        <Image src={img1} alt={img1_alt} fill className="rounded-2xl" />
      </motion.div>
      <motion.div
        className="absolute bottom-0 right-10 aspect-[4/5] h-auto w-[24rem]"
        style={{ y: imagey2 }}
      >
        <Image
          src={img2}
          alt={img2_alt}
          fill
          className="h-full w-full rounded-3xl object-cover"
        />
      </motion.div>
    </section>
  );
};

interface Textsideprops {
  subhead_about: string;
  text_about: string;
}
const Textside = ({ subhead_about, text_about }: Textsideprops) => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay: 0.5, ease: "easeOut" }}
      className="flex h-full w-2/5 flex-col justify-center gap-12 p-4 max-md:w-full"
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
};
export default AboutBrief;
