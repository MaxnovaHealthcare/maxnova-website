"use client";

import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

export default function Showreel() {
  const showreelRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: showreelRef,
    offset: ["start end", "end start"],
  });

  const size = useTransform(scrollYProgress, [-0.75, 0.25], ["50%", "100%"]);

  return (
    <section className="flex h-screen min-h-screen w-full flex-col items-center justify-center max-lg:px-10 max-md:p-4 max-md:px-0">
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
