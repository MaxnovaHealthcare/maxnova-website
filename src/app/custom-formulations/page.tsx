"use client";

import React, { useEffect, useState } from "react";
import HorizontalScrollCarousel from "./horizontal-scroll";
import CTAButtons from "../buttons";
import WhyUS from "../whyus";
import OtherServices from "../ourservices";
import { motion } from "framer-motion";

interface CustData {
  head_custom: string;
  image_custom: string;
  image_alt_custom: string;
  text_custom: string;
  steps: Step[];
}

interface Step {
  head: string;
  text: string;
}

async function getCustData(): Promise<CustData[]> {
  const res = await fetch(
    "https://maxnovabackend-38x5s.ondigitalocean.app/api/utils/get-custom",
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function PrivateLabelPage() {
  const [custData, setCustData] = useState<CustData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCustData();
        if (data.length > 0) {
          setCustData(data[0]);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const spaceIndex =
    custData?.head_custom.lastIndexOf(
      " ",
      Math.floor(custData.head_custom.length / 2),
    ) ?? 0;
  const firstPart = custData?.head_custom.slice(0, spaceIndex);
  const secondPart = custData?.head_custom.slice(spaceIndex + 1);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="bg-prim z-0 flex min-h-screen w-screen snap-y flex-col">
      <section className="bg-prim flex h-screen min-h-screen w-full flex-col items-center justify-center p-12 px-6 max-md:mt-16 max-md:min-h-[75vh] max-md:p-4 lg:mt-10">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative flex h-full w-full items-center justify-center rounded-3xl bg-accent1"
        >
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center font-humane font-bold uppercase max-md:text-8xl lg:text-max"
          >
            {firstPart}
            <br />
            {secondPart}
          </motion.h1>
        </motion.div>
      </section>

      <section className="mt-6 flex min-h-screen flex-col items-start justify-start p-12 px-0">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="z-[1] flex w-full flex-col items-center justify-center gap-4 max-md:px-4"
        >
          <h1 className="text-center font-humane font-semibold max-md:text-8xl lg:text-max">
            HOW DOES IT WORK?
          </h1>
          <p className="w-1/2 text-center text-para max-md:w-full">
            {custData?.text_custom}
          </p>
          <CTAButtons
            cta="../contact"
            text="enquire now"
            bgcolor="bg-accent1"
          />
        </motion.div>
        <HorizontalScrollCarousel steps={custData?.steps || []} />
      </section>

      <section className="-mt-24 flex min-h-screen flex-col items-start justify-start px-4 max-md:-mt-20">
        <WhyUS />
      </section>
      <section className="flex min-h-screen flex-col items-start justify-start px-4">
        <OtherServices />
      </section>
    </main>
  );
}
