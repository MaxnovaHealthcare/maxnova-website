/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useTransform, useScroll } from "framer-motion";
import ServiceBento from "../service-bento";
import Image from "next/image";
import OtherServices from "../ourservices";
import CTAButtons from "../buttons";

async function getPCDData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/utils/get-pcd`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/company`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function PCDFranchisePage() {
  const [data, setData] = useState(null);
  const [pcdData, setpcdData] = useState<{
    head_pcd: string;
    text_pcd: string;
    image_hero_pcd: string;
    image_pcd: string;
    image_alt_pcd: string;
  } | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPCDData()
      .then((data) => {
        if (data.length > 0) {
          setpcdData(data[0]);
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  const spaceIndex =
    pcdData?.head_pcd.lastIndexOf(
      " ",
      Math.floor(pcdData.head_pcd.length / 2),
    ) ?? 0;
  const firstPart = pcdData?.head_pcd?.slice(0, spaceIndex);
  const secondPart = pcdData?.head_pcd.slice(spaceIndex + 1);

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
  const ref1 = useRef(null);

  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: ref1,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress1, [0, 1], [-50, 50]);
  const x2 = useTransform(scrollYProgress1, [1, 0], [-50, 50]);

  const getWindowWidth = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 0;
  };

  const y1 = useTransform(
    scrollYProgress,
    [0, 1],
    getWindowWidth() < 768 ? [0, 1] : [100, -200],
  );
  const y2 = useTransform(
    scrollYProgress,
    [0, 1],
    getWindowWidth() < 768 ? [0, 1] : [-100, 200],
  );

  return (
    <main className="bg-prim z-0 flex min-h-screen w-full snap-y flex-col">
      <section className="flex h-screen min-h-screen w-full flex-col items-center justify-center p-12 px-6 max-md:mt-16 max-md:min-h-[75vh] max-md:p-4 lg:mt-10">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-accent1 text-primary"
        >
          <Image
            src={pcdData?.image_hero_pcd ?? "/image_alt_pcd"}
            alt={pcdData?.image_alt_pcd ?? "image_alt_pcd"}
            fill
            quality={100}
            className="absolute left-0 top-0 z-0 border-none object-cover brightness-90 filter"
          />
          <motion.h1
            ref={ref1}
            style={{ x: x1 }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
            className="w-fit text-center font-humane font-bold uppercase max-md:text-8xl max-md:leading-[0.9] lg:text-max"
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
            className="w-fit text-center font-humane font-bold uppercase max-md:text-8xl max-md:leading-[0.9] lg:text-max"
          >
            {secondPart}
          </motion.h1>
        </motion.div>
      </section>
      <section className="mt-6 flex flex-col items-start justify-center px-0 py-24 max-md:py-12">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="z-[1] flex w-full flex-col items-center justify-center gap-4 max-md:px-4"
        >
          <h1 className="text-center font-humane font-bold uppercase max-md:text-8xl lg:text-max">
            PCD Franchise : grow with us
          </h1>
          <p className="w-4/5 text-center text-para max-md:w-full">
            {!pcdData?.text_pcd
              ? "this is about"
              : pcdData?.text_pcd.split("|").map((para, index) => (
                  <React.Fragment key={index}>
                    {para}
                    <br />
                    <br />
                  </React.Fragment>
                ))}
          </p>
          <CTAButtons cta="../contact" text="enquire now" />
        </motion.div>
      </section>
      <section className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-24 overflow-hidden p-12 max-md:gap-12 max-md:p-4 md:py-36">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center font-humane font-bold text-accent2 max-md:text-8xl lg:text-max"
        >
          OUR BRANDS
        </motion.h1>
        {!data && (
          <h1 className="text-center font-helvetica text-head font-semibold">
            No brands as of now <br />
            We are working hard on this one!
          </h1>
        )}
        <div
          ref={gallery}
          className="flex h-fit w-full items-center justify-center gap-16 space-x-16 max-md:m-0 max-md:flex-col max-md:gap-12 max-md:space-x-0 max-md:p-0 lg:my-12"
        >
          <motion.div
            style={{ y: y1 }}
            className="flex h-fit w-fit flex-col items-center justify-center space-y-48 max-md:m-0 max-md:gap-12 max-md:space-y-0 max-md:p-0 lg:-mt-12"
          >
            {(data as any)?.allCompany?.map((brand: any, index: number) =>
              index % 2 === 0 ? (
                <motion.div
                  initial={{ y: 100 }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.5 }}
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
            className="flex h-fit w-fit flex-col items-center justify-center space-y-48 max-md:m-0 max-md:space-y-12 max-md:p-0 lg:-mt-12"
          >
            {(data as any)?.allCompany?.map((brand: any, index: number) =>
              index % 2 !== 0 ? (
                <motion.div
                  initial={{ y: -100 }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.5 }}
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
      <section className="flex min-h-screen flex-col items-start justify-start px-4 py-24">
        <ServiceBento />
      </section>
      <section className="flex min-h-screen flex-col items-start justify-start px-4">
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
      className="relative flex h-[32rem] w-[22rem] flex-col items-center justify-between overflow-hidden rounded-3xl border-2 border-accent1 bg-accent1/10 p-12 px-6"
    >
      <div className="relative flex h-[90%] w-full items-center justify-center py-6">
        <img
          src={image}
          alt={naam}
          className="h-auto max-h-[90%] w-auto object-cover"
        />
      </div>
      <div className="relative flex h-[10%] w-full flex-col items-center justify-center gap-4">
        <CTAButtons
          text={`Explore Product Range`}
          cta={`/pcd-franchise/${id}`}
        />
      </div>
    </Link>
  );
}
