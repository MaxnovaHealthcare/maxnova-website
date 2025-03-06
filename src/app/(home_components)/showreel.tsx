"use client";

import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

interface ShowreelProps {
  video_name: string;
  link?: string;
}

const Showreel: React.FC<ShowreelProps> = ({ video_name }) => {
  const showreelRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: showreelRef,
    offset: ["start end", "end start"],
  });

  const size = useTransform(scrollYProgress, [-0.5, 0.25], ["50%", "100%"]);

  return (
    <section
      className={`flex w-full flex-col items-center justify-center py-24 max-md:w-full max-md:px-0 max-md:py-12`}
    >
      <motion.div
        ref={showreelRef}
        className="relative flex items-center justify-center overflow-hidden rounded-3xl bg-secondary text-accent3 max-md:rounded-lg"
        style={{ width: size, height: size }}
      >
        <video
          className="h-auto w-full object-cover"
          src={`/images/${video_name}.mp4`}
          autoPlay
          muted
          loop
          playsInline
        />
      </motion.div>
    </section>
  );
};

export default Showreel;
