"use client";

import React, { useEffect, useState, useRef } from "react";
import HorizontalScrollCarousel from "../horizontal-scroll";
import CTAButtons from "../buttons";
import Image from "next/image";
import ServiceBento from "../service-bento";
import OtherServices from "../ourservices";
import { motion, useScroll, useTransform } from "framer-motion";

interface PvtData {
  head_pvt: string;
  image_hero_pvt: string;
  image_pvt: string;
  image_alt_pvt: string;
  text_pvt: string;
  steps: Step[];
}

interface Step {
  head: string;
  text: string;
}

async function getPvtData(): Promise<PvtData[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/utils/get-pvt`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function PrivateLabelPage() {
  const [pvtData, setPvtData] = useState<PvtData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPvtData();
        if (data.length > 0) {
          setPvtData(data[0]);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const ref1 = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref1,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const x2 = useTransform(scrollYProgress, [1, 0], [-50, 50]);
  const spaceIndex =
    pvtData?.head_pvt.lastIndexOf(
      " ",
      Math.floor(pvtData.head_pvt.length / 2),
    ) ?? 0;
  const firstPart = pvtData?.head_pvt.slice(0, spaceIndex);
  const secondPart = pvtData?.head_pvt.slice(spaceIndex + 1);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="bg-prim z-0 flex min-h-screen w-full flex-col">
      <section className="bg-prim flex h-screen min-h-screen w-full flex-col items-center justify-center p-12 px-6 max-md:mt-16 max-md:min-h-[75vh] max-md:p-4 lg:mt-10">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-accent1 text-primary"
        >
          <motion.h1
            ref={ref1}
            style={{ x: x1 }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
            className="z-[1] w-fit text-center font-humane font-bold uppercase max-md:text-8xl lg:text-max"
          >
            {firstPart}
          </motion.h1>
          <motion.h1
            ref={ref1}
            style={{ x: x2 }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
            className="z-[1] w-fit text-center font-humane font-bold uppercase max-md:text-8xl lg:text-max"
          >
            {secondPart}
          </motion.h1>
          <Image
            src={pvtData?.image_hero_pvt || ""}
            alt={pvtData?.image_alt_pvt || ""}
            fill
            quality={100}
            className="absolute top-0 z-0 object-cover"
          />
        </motion.div>
      </section>

      <section className="mt-6 flex flex-col items-start justify-start px-0 py-24 max-md:py-12">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="z-[1] flex w-full flex-col items-center justify-center gap-4 max-md:px-4"
        >
          <h1 className="text-center font-humane font-bold uppercase text-accent2 max-md:text-8xl lg:text-max">
            your vision, our innovation
          </h1>
          <p className="w-4/5 text-center text-para max-md:w-full">
            {!pvtData?.text_pvt
              ? "this is about"
              : pvtData?.text_pvt.split("|").map((para, index) => (
                  <React.Fragment key={index}>
                    {para}
                    <br />
                    <br />
                  </React.Fragment>
                ))}
          </p>
          <CTAButtons cta="../contact" text="enquire now" />
        </motion.div>
        <HorizontalScrollCarousel steps={pvtData?.steps || []} />
      </section>
      <section className="flex min-h-screen flex-col items-start justify-start px-4 py-24">
        <ServiceBento />
      </section>
      <section className="flex min-h-screen flex-col items-start justify-start px-4">
        <OtherServices />
      </section>
    </main>
  );
}
