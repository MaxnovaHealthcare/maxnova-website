"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useTransform, useScroll } from "framer-motion";
import WhyUS from "../whyus";
import OtherServices from "../(home_components)/ourservices";

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
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -750]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <main className="bg-prim z-0 flex min-h-screen w-screen snap-y flex-col">
      <section className="flex h-screen min-h-screen w-screen flex-col items-center justify-center p-12 px-6 md:mt-10 md:p-12">
        <div className="relative flex h-full w-full items-center justify-center rounded-3xl bg-accent1">
          <h1 className="text-center font-humane text-max font-bold">
            PRODUCTS THAT <br /> CAPTURE THE MARKET
          </h1>
        </div>
      </section>
      <section className="flex min-h-screen flex-col items-center justify-center gap-24 overflow-hidden p-12">
        <h1 className="text-center font-humane text-max font-bold">
          OUR BRANDS
        </h1>
        <div
          ref={gallery}
          className="my-12 flex h-fit w-full items-center justify-center space-x-48"
        >
          <motion.div
            style={{ y: y1 }}
            className="-mt-12 flex h-fit w-fit flex-col items-center justify-center space-y-48"
          >
            {(data as any)?.allCompany?.map((brand: any, index: number) =>
              index % 2 === 0 ? (
                <div
                  className="flex h-fit w-fit items-center justify-center"
                  key={index}
                >
                  <BrandsCards naam={brand.name} id={brand._id} />
                </div>
              ) : null,
            )}
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="mt-24 flex h-fit w-fit flex-col items-center justify-center space-y-48"
          >
            {(data as any)?.allCompany?.map((brand: any, index: number) =>
              index % 2 !== 0 ? (
                <div
                  className="flex w-fit items-center justify-center"
                  key={index}
                >
                  <BrandsCards naam={brand.name} id={brand._id} />
                </div>
              ) : null,
            )}
          </motion.div>
        </div>
      </section>
      <section className="flex min-h-screen flex-col items-start justify-start">
        <WhyUS />
      </section>
      <section className="flex min-h-screen flex-col items-start justify-start">
        <OtherServices />
      </section>
    </main>
  );
}

function BrandsCards({ naam, id }: { naam: string; id: string }) {
  return (
    <Link
      href={`/pcd-franchise/${id}`}
      className="flex h-[40rem] w-[27.5rem] items-center justify-center rounded-3xl border-[0.5px] border-[#130d14]"
    >
      <h1 className="flex flex-wrap text-wrap font-humane text-8xl font-semibold uppercase">
        {naam}
      </h1>
    </Link>
  );
}
