"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";

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
  const [scrollFactor, setScrollFactor] = useState(0);

  const cardWidth = 27.5 * 16;
  const cardSpacing = 24 * 16;
  const mobileCardWidth = 22 * 16;
  const mobileCardSpacing = 12 * 16;

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const isMobileView = windowWidth < 768;
      setIsMobile(isMobileView);

      const width = isMobileView ? mobileCardWidth : cardWidth;
      const spacing = isMobileView ? mobileCardSpacing : cardSpacing;

      const totalScrollWidth = (width + spacing) * steps.length;

      setScrollFactor(100 * (totalScrollWidth / windowWidth));
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [
    steps.length,
    cardWidth,
    cardSpacing,
    mobileCardWidth,
    mobileCardSpacing,
  ]);

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${scrollFactor}%`]);

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
