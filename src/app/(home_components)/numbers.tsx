"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

interface NumbersProps {
  numbs: { numb: number; head: string }[];
  sindex: number;
  eindex: number;
}

const Numbers = ({ numbs, sindex, eindex }: NumbersProps) => {
  const ref1 = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref1,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [1, 0], [-100, 100]);
  const x2 = useTransform(scrollYProgress, [1, 0], [100, -100]);

  const heading = "Our Numbers Reflect Our Success";
  const spaceIndex =
    heading.lastIndexOf(" ", Math.floor(heading.length / 2)) ?? 0;
  const firstPart = heading.slice(0, spaceIndex);
  const secondPart = heading.slice(spaceIndex + 1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const currentRef = ref1.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={ref1}
      className="flex w-full flex-col items-center justify-start gap-12 p-12 max-md:m-0 max-md:h-fit max-md:flex-col max-md:px-0 max-md:py-24 lg:px-10"
    >
      <div className="flex w-full flex-col items-center justify-center gap-0 text-accent2">
        <motion.h1
          style={{ x: x1 }}
          className="w-fit text-center font-humane font-bold uppercase max-md:text-8xl lg:text-max"
        >
          {firstPart}
        </motion.h1>
        <motion.h1
          style={{ x: x2 }}
          className="w-fit text-center font-humane font-bold uppercase max-md:text-8xl lg:text-max"
        >
          {secondPart}
        </motion.h1>
      </div>
      <div className="grid w-full grid-cols-3 items-center justify-between gap-11">
        {numbs.slice(sindex, eindex).map((num, i) => (
          <div
            key={i}
            className="flex w-full flex-col items-center justify-center rounded-2xl border border-accent2 px-4 py-8 text-accent2"
          >
            <h1 className="font-humane text-max font-bold">
              {visible ? <CountUp to={num.numb} /> : 0}
            </h1>
            <p className="text-subhead font-semibold">{num.head}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const CountUp: React.FC<{ to: number }> = ({ to }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = to / (duration / 25);

    const interval = setInterval(() => {
      start += increment;
      if (start >= to) {
        setCount(to);
        clearInterval(interval);
      } else {
        setCount(Math.ceil(start));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [to]);

  return <>{count}</>;
};

export default Numbers;
