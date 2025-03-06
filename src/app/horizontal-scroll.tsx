"use client";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0", `-${steps.length * (isMobile ? 24 : 28)}rem`],
  );

  const containerHeight = `${steps.length * 28 * 2}rem`;

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: containerHeight }}
    >
      <div className="sticky left-0 top-0 flex h-screen w-full items-center overflow-hidden">
        <motion.div
          style={{ x: translateX }}
          className="flex h-screen items-center gap-8 pl-8 pt-16 md:gap-24 md:pl-16"
        >
          {steps.map((card, index) => (
            <div
              key={index}
              className="flex aspect-[3/5] w-[28rem] flex-shrink-0 flex-col items-start justify-between overflow-hidden rounded-3xl border border-accent1 p-6 max-md:w-[24rem]"
            >
              <div className="flex h-fit w-full flex-col items-start justify-start">
                <p className="font-humane text-4xl uppercase md:text-[3rem]">
                  {index < 9 ? "0" : ""}
                  {index + 1}
                </p>
                <p className="font-humane text-7xl font-medium uppercase md:text-8xl">
                  {card.head}
                </p>
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <p className="text-min md:text-para">
                  {card.text.split("*").map((text: string, index: number) => (
                    <span key={index} className="flex flex-col gap-5">
                      {index === 0 ? (
                        <>
                          {text.split("|").map((para, idx) => (
                            <React.Fragment key={idx}>
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
