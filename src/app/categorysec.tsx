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
import Marquee from "react-fast-marquee";


async function getCategoryData() {
  const res = await fetch(
    "https://maxnovabackend-38x5s.ondigitalocean.app/api/category",
  );
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
    <section className="flex min-h-screen w-full flex-col gap-24 max-md:mb-[100px]">

      <motion.h1
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5, ease: "linear" }}
        className="text-center font-humane text-max font-bold uppercase text-accent2 max-md:w-full max-md:text-center max-md:text-8xl"
      >
        covering it all
      </motion.h1>
      <div className="mar font-humane">
        {/*  */}
        <Marquee className="mar1 " speed={80}>
          <h1>Category 1</h1>
          <div className="img-box"></div>
          <h1>Category 1</h1>
          <div className="img-box"></div>
          <h1>Category 1</h1>
          <div className="img-box"></div>
        </Marquee>
        {/*  */}
        <Marquee className="mar1" direction="right" speed={100}>
          <h1>Category 2</h1>
          <div className="img-box"></div>
          <h1>Category 2</h1>
          <div className="img-box"></div>
          <h1>Category 2</h1>
          <div className="img-box"></div>
        </Marquee>
        {/*  */}
        <Marquee className="mar1" speed={80}>
          <h1>Category 3</h1>
          <div className="img-box"></div>
          <h1>Category 3</h1>
          <div className="img-box"></div>
          <h1>Category 3</h1>
          <div className="img-box"></div>
        </Marquee>

      </div>
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
