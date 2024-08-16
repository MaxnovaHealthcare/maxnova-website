"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useTransform, useScroll, delay } from "framer-motion";
import WhyUS from "../whyus";
import Image from "next/image";
import OtherServices from "../ourservices";

async function getData() {
  const res = await fetch("http://localhost:4000/api/company");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function PCDFranchisePage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  const gallery = useRef(null);
  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const getWindowWidth = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 0;
  };

  const y1 = useTransform(
    scrollYProgress,
    [0, 1],
    getWindowWidth() < 768 ? [0, 1] : [0, 150],
  );
  const y2 = useTransform(
    scrollYProgress,
    [0, 1],
    getWindowWidth() < 768 ? [0, 1] : [0, -750],
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <main className="bg-prim z-0 flex min-h-screen w-screen snap-y flex-col">
      <section className="bg-prim flex h-screen min-h-screen w-full flex-col items-center justify-center p-12 px-6 max-md:mt-20 max-md:min-h-[75vh] max-md:p-4 lg:mt-10">
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
            className="text-center font-humane font-bold max-md:text-8xl lg:text-max"
          >
            PRODUCTS THAT CAPTURE THE MARKET
          </motion.h1>
        </motion.div>
      </section>
      <section className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-24 overflow-hidden p-12 max-md:gap-12 max-md:p-4">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center font-humane font-bold max-md:text-8xl lg:text-max"
        >
          OUR BRANDS
        </motion.h1>
        <div
          ref={gallery}
          className="flex h-fit w-full items-center justify-center space-x-48 max-md:m-0 max-md:flex-col max-md:gap-12 max-md:space-x-0 max-md:p-0 lg:my-12"
        >
          <motion.div
            style={{ y: y1 }}
            className="flex h-fit w-full flex-col items-center justify-center space-y-48 max-md:m-0 max-md:gap-12 max-md:space-y-0 max-md:p-0 lg:-mt-12"
          >
            {(data as any)?.allCompany?.map((brand: any, index: number) =>
              index % 2 === 0 ? (
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex h-fit w-fit items-center justify-center max-md:w-full"
                  key={index}
                >
                  <BrandsCards
                    naam={brand.name}
                    id={brand._id}
                    image={brand.image}
                    desc={brand.description}
                  />
                </motion.div>
              ) : null,
            )}
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="flex h-fit w-full flex-col items-center justify-center space-y-48 max-md:m-0 max-md:space-y-12 max-md:p-0 lg:-mt-12"
          >
            {(data as any)?.allCompany?.map((brand: any, index: number) =>
              index % 2 !== 0 ? (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex w-fit items-center justify-center max-md:w-full"
                  key={index}
                >
                  <BrandsCards
                    naam={brand.name}
                    id={brand._id}
                    image={brand.image}
                    desc={brand.description}
                  />
                </motion.div>
              ) : null,
            )}
          </motion.div>
        </div>
      </section>
      <section className="flex min-h-screen flex-col items-start justify-start px-4">
        <WhyUS />
      </section>
      <section className="flex min-h-screen flex-col items-start justify-start">
        <OtherServices />
      </section>
    </main>
  );
}

function BrandsCards({
  naam,
  id,
  image,
  desc,
}: {
  naam: string;
  id: string;
  image: string;
  desc: string;
}) {
  return (
    <Link
      href={`/pcd-franchise/${id}`}
      className="border-accent1 relative flex h-[40rem] w-[27.5rem] flex-wrap items-center justify-center overflow-hidden rounded-3xl border p-8 max-md:h-[36rem] max-md:w-full max-md:p-4"
    >
      <Image
        src={image}
        alt={desc}
        fill
        className="absolute z-0 bg-secondary object-cover opacity-75"
      />
      <h1 className="z-[1] flex flex-wrap text-wrap font-humane text-8xl font-semibold uppercase">
        {naam}
      </h1>
    </Link>
  );
}
