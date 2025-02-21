"use client";

import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

interface ShowreelProps {
  height: string;
}

export default function Showreel({ height }: ShowreelProps) {
  const showreelRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: showreelRef,
    offset: ["start end", "end start"],
  });

  const size = useTransform(scrollYProgress, [-0.75, 0.25], ["50%", "100%"]);

  return (
    <section
      className="my-24 flex w-full flex-col items-center justify-center max-lg:px-10 max-md:p-4 max-md:px-0"
      style={{ height: `${height}` }}
    >
      <motion.div
        ref={showreelRef}
        className="relative flex items-center justify-center overflow-hidden rounded-3xl bg-secondary text-accent3"
        style={{ width: size, height: size }}
      >
        {/* <video
          className="h-auto w-full object-cover"
          src={"./images/showreel.mov"}
          autoPlay
          muted
          loop
        /> */}
        abc
      </motion.div>
    </section>
  );
}
