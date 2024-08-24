"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import React, { useRef, JSX, useEffect, useState } from "react";

interface Step {
  head: string;
  text: string;
}

interface HorizontalScrollCarouselProps {
  steps: Step[];
}

export default function HorizontalScrollCarousel({
  steps,
}: HorizontalScrollCarouselProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const x1 = useTransform(
    scrollYProgress,
    [0, 1],
    ["1%", `-${steps.length * (20 - 1.81 * steps.length)}%`],
  );
  const x2 = useTransform(
    scrollYProgress,
    [0, 1],
    ["1%", `-${steps.length * (25 - 1.7625 * steps.length)}%`],
  );

  const x = isMobile ? x2 : x1;
  const sectionHeight = `${steps.length * 100}vh`;

  return (
    <section
      ref={targetRef}
      className="relative"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex space-x-24 max-md:space-x-12">
          {steps.map((card, index) => (
            <div
              key={index}
              className="flex h-max min-h-[40rem] w-[27.5rem] flex-col items-start justify-between overflow-hidden rounded-3xl border border-accent1 p-6 max-md:min-h-[36rem] max-md:w-[22rem] dark:border-accent1"
            >
              <div className="flex h-fit w-full flex-col items-start justify-start">
                <p className="font-humane text-[3rem] uppercase">
                  {index < 9 ? "0" : ""}
                  {index + 1}
                </p>
                <p className="font-humane text-7xl font-semibold uppercase">
                  {card.head}
                </p>
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <p className="text-para">{card.text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
