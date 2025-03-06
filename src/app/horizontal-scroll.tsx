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

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const x1 = useTransform(
    scrollYProgress,
    [0, 1],
    ["2.5%", `-${steps.length * 10}%`],
  );
  const x2 = useTransform(
    scrollYProgress,
    [0, 1],
    ["2.5%", `-${steps.length * 12.5}%`],
  );
  const x = isMobile ? x2 : x1;

  const sectionHeight = `${Math.pow(steps.length + 2, 3)}rem`;

  return (
    <section
      ref={targetRef}
      className="relative"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex space-x-24 pt-16 max-md:space-x-12"
        >
          {steps.map((card, index) => (
            <div
              key={index}
              className="flex aspect-[3/5] w-[28rem] flex-col items-start justify-between overflow-hidden rounded-3xl border border-accent1 p-6 max-md:w-[24rem]"
            >
              <div className="flex h-fit w-full flex-col items-start justify-start">
                <p className="font-humane text-[3rem] uppercase max-md:text-4xl">
                  {index < 9 ? "0" : ""}
                  {index + 1}
                </p>
                <p className="font-humane text-8xl font-medium uppercase max-md:text-7xl">
                  {card.head}
                </p>
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <p className="text-para max-md:text-min">
                  {card.text.split("*").map((text: string, index: number) => (
                    <span key={index} className="flex flex-col gap-5">
                      {index === 0 ? (
                        <>
                          {text.split("|").map((para, index) => (
                            <React.Fragment key={index}>
                              {para}
                              <br />
                            </React.Fragment>
                          ))}
                        </>
                      ) : (
                        <React.Fragment>{`• ${text}`}</React.Fragment>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
