"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

interface NumbersProps {
  numbs: { numb: string; head: string }[];
  sindex: number;
  eindex: number;
}

const Numbers: React.FC<NumbersProps> = ({ numbs, sindex, eindex }) => {
  const ref1 = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref1,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [1, 0], [-75, 75]);
  const x2 = useTransform(scrollYProgress, [1, 0], [75, -75]);
  const heading = "Our Numbers Reflect Our Success";
  const middleIndex = Math.ceil(heading.split(" ").length / 2);
  const firstPart = heading.split(" ").slice(0, middleIndex).join(" ");
  const secondPart = heading.split(" ").slice(middleIndex).join(" ");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref1.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(ref1.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ ref1 }
      className="flex w-full flex-col items-center justify-start gap-12 p-12 max-md:m-0 max-md:h-fit max-md:flex-col max-md:px-4 max-md:py-24"
    >
      <div className="flex w-full flex-col items-center justify-center gap-0 text-accent2">
        <motion.h1
          style={ { x: x1 } }
          className="w-fit text-nowrap text-center font-humane font-bold uppercase max-md:text-8xl lg:text-max"
        >
          { firstPart }
        </motion.h1>
        <motion.h1
          style={ { x: x2 } }
          className="w-fit text-center font-humane font-bold uppercase max-md:text-8xl lg:text-max"
        >
          { secondPart }
        </motion.h1>
      </div>
      <div className="grid w-full grid-cols-3 items-center justify-between gap-11 max-md:grid-cols-2 max-md:gap-4">
        { numbs.slice(sindex, eindex).map((num, i) => {
          const numberString = num.numb;
          const hasPlus = numberString.endsWith('+');
          const countValue = Number(hasPlus ? numberString.slice(0, -1) : numberString);

          return (
            <div
              key={ i }
              className="flex w-full flex-col items-center justify-center rounded-2xl border border-accent2 px-4 py-8 text-accent2"
            >
              <h1 className="font-humane text-max font-bold max-md:text-[5rem] max-md:leading-[1]">
                { visible ? (
                  <CountUp end={ countValue } suffix={ hasPlus ? "+" : "" } />
                ) : (
                  0
                ) }
              </h1>
              <p className="text-subhead font-semibold max-md:text-xl max-md:font-normal">
                { num.head }
              </p>
            </div>
          );
        }) }
      </div>
    </section>
  );
};

interface CountUpProps {
  end: number;
  suffix?: string;
}

const CountUp: React.FC<CountUpProps> = ({ end, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const duration = 2000;
      const progress = Math.min(elapsedTime / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end]);

  return <>{ count }{ suffix }</>;
};

export default Numbers;