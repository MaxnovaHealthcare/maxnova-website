"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import Image from "next/image";
import { wrap } from "@motionone/utils";
import img from "../../public/images/a.jpeg";

async function getCategoryData() {
  const res = await fetch("http://localhost:4000/api/category");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function CategorySec() {
  const [categoryData, setCategoryData] = useState<any[] | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const categories = await getCategoryData();
        setCategoryData(categories);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="flex min-h-screen w-full flex-col gap-24">
      <motion.h1
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5, ease: "linear" }}
        className="text-center font-humane text-max font-bold uppercase text-accent2 max-md:w-full max-md:text-center max-md:text-8xl"
      >
        covering it all
      </motion.h1>
      <motion.div className="relative flex w-full flex-wrap gap-20">
        {categoryData?.map((category, index) => (
          <div
            key={index}
            className={`flex w-full flex-col items-center justify-center`}
          >
            <ParallaxText baseVelocity={index % 2 === 0 ? -2 : 2}>
              <div className="relative flex h-fit w-fit flex-row items-center justify-center space-x-24 overflow-hidden">
                <h1 className="h-fit font-humane text-scroll uppercase max-md:text-6xl max-md:font-semibold">
                  {category.name}
                </h1>
                <Image
                  src={img}
                  alt="category"
                  className="h-full min-h-36 w-full rounded-lg object-cover"
                />
              </div>
            </ParallaxText>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

interface ParallaxProps {
  children: any;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity }: ParallaxProps) {
  const baseX = useMotionValue(1);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const velocityFactor = useTransform(scrollVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => `${wrap(-10, 10, v)}%`);
  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1500);
    if (velocityFactor.get() < 0) {
      directionFactor.current = 1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });
  return (
    <div className="m-0 flex flex-nowrap overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex w-full flex-nowrap space-x-24 whitespace-nowrap"
        style={{ x }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="flex h-fit w-fit flex-shrink-0">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
