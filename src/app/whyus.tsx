"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import wlogo from "../../public/images/logowhite.png";
import dropper from "../../public/images/img22.jpg";
import dlogo from "../../public/images/darklogoblack.png";
import { motion } from "framer-motion";

async function getHomeData() {
  const res = await fetch(
    "https://maxnovabackend-38x5s.ondigitalocean.app/api/utils/get-home",
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function WhyUS() {
  const [homedata, setData] = useState<{
    head_whyus: string;
    text1_whyus: string;
    whylist_whyus: string;
    text2_whyus: string;
    text_3_whyus: string;
    image_3_whyus: string;
    image_alt_3_whyus: string;
    text_4_whyus: string;
    image_4_whyus: string;
    image_alt_4_whyus: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHomeData()
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          setData(data[0]);
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!homedata) {
    return <div>Loading...</div>;
  }

  const spaceIndexh = homedata.head_whyus.indexOf(
    " ",
    Math.floor(homedata.head_whyus.length / 2),
  );

  const firstParth = homedata.head_whyus.slice(0, spaceIndexh);
  const secondParth = homedata.head_whyus.slice(spaceIndexh + 1);
  const spaceIndext = homedata.text1_whyus.lastIndexOf(
    " ",
    Math.floor(homedata.text1_whyus.length / 2),
  );
  const firstPartt = homedata.text1_whyus.slice(0, spaceIndext);
  const secondPartt = homedata.text1_whyus.slice(spaceIndext + 1);

  return (
    <section className="flex min-h-[120vh] w-full p-12 max-md:my-24 max-md:h-fit max-md:p-4 max-md:px-0 lg:h-[120vh] lg:px-10">
      {/* main div */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "linear" }}
        className="flex h-full w-full gap-8 max-md:flex-col"
      >
        {/* left div */}
        <div className="flex h-full w-2/3 flex-col gap-8 max-md:w-full">
          {/* upper div */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.5,
              duration: 0.75,
              ease: "linear",
            }}
            className="flex h-1/2 w-full flex-col items-start justify-between rounded-3xl bg-accent1 p-8 max-md:h-[65vh] max-md:px-4"
          >
            <h1 className="h-fit font-humane text-max font-bold capitalize max-md:text-8xl">
              {firstParth}
              <br />
              {secondParth}
            </h1>
            <div className="flex w-full items-end justify-between gap-8 max-md:flex-col-reverse max-md:items-start max-md:justify-end max-md:gap-4">
              <div className="flex w-fit items-center justify-center gap-4">
                <Image src={dlogo} alt="logo" className="h-8 w-auto" />
                <p className="text-xl font-semibold">maxnova healthcare</p>
              </div>
              <p className="w-fit text-para">
                {firstPartt}
                <br />
                {secondPartt}
              </p>
            </div>
          </motion.div>
          {/* lower div */}
          <div className="flex h-1/2 w-full gap-8 max-md:flex-col">
            {/* left div */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.75,
                ease: "linear",
              }}
              className="relative h-full w-1/2 overflow-hidden rounded-3xl bg-secondary max-md:h-[65vh] max-md:w-full"
            >
              <Image
                src={homedata.image_3_whyus ? homedata.image_3_whyus : dropper}
                fill
                alt={homedata.image_alt_3_whyus}
                className="z-0 object-cover object-center"
              />
              <div className="z-[1] flex h-full w-full flex-col items-center justify-end p-8 px-4 text-secondary">
                <p className="z-[1] text-center text-subhead capitalize">
                  {homedata.text_3_whyus}
                </p>
              </div>
            </motion.div>
            {/* right div */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.25,
                duration: 0.75,
                ease: "linear",
              }}
              className="bg-seco flex h-full w-1/2 flex-col items-center justify-center gap-6 rounded-3xl p-8 max-md:h-[65vh] max-md:w-full max-md:px-4 max-md:text-center"
            >
              {homedata.whylist_whyus.split(",").map((text: string) => (
                <p
                  key={text}
                  className="text-head font-semibold transition-all duration-200 hover:scale-110 hover:text-accent1 max-md:text-3xl dark:hover:text-accent2"
                >
                  {text}
                </p>
              ))}
              {[].map((text) => (
                <p
                  key={text}
                  className="text-head font-semibold transition-all duration-200 hover:scale-110 hover:text-accent1 max-md:text-3xl dark:hover:text-accent2"
                >
                  {text}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
        {/* right div */}
        <div className="flex h-full w-1/3 flex-col gap-8 space-x-0 space-y-0 max-md:w-full">
          {/* upper div */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.5,
              duration: 0.75,
              ease: "linear",
            }}
            className="relative h-2/3 w-full overflow-hidden rounded-3xl bg-secondary max-md:h-[65vh]"
          >
            <Image
              src={homedata.image_4_whyus ? homedata.image_4_whyus : dropper}
              fill
              alt={homedata.image_alt_4_whyus}
              className="absolute z-0 h-full w-full object-cover object-center opacity-50"
            />
            <div className="z-[1] flex h-full w-full flex-col items-center justify-between p-8 text-secondary max-md:px-4">
              <p className="z-[1] text-subhead font-bold">maxnova</p>
              <p className="z-[1] text-center text-subhead capitalize">
                {homedata.text_4_whyus
                  ? homedata.text_4_whyus
                  : "Short product development cycle & Brand-specific products with Specialised consultation"}
              </p>
            </div>
          </motion.div>
          {/* lower div */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.5,
              duration: 0.75,
              ease: "linear",
            }}
            className="flex h-1/3 w-full flex-col items-center justify-between rounded-3xl bg-accent2 p-8 text-accent1 max-md:h-[65vh] max-md:px-4 dark:bg-accent1"
          >
            <Image src={wlogo} alt="logo" className="h-8 w-auto" />
            <p className="text-center text-head font-semibold transition-all duration-200">
              {homedata.text2_whyus}
            </p>
            <p className="z-[1] text-subhead font-bold">maxnova</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
