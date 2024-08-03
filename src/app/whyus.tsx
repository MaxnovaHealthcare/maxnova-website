"use client";

import React from "react";
import Image from "next/image";
import wlogo from "../../public/images/logowhite.png";
import dropper from "../../public/images/img22.jpg";
import dlogo from "../../public/images/darklogoblack.png";

export default function WhyUS() {
  return (
    <section className="flex h-[120vh] min-h-[120vh] w-full px-24 py-12">
      <div className="flex h-full w-full gap-8">
        <div className="flex h-full w-2/3 flex-col gap-8">
          <div className="flex h-1/2 w-full flex-col items-start justify-between rounded-3xl bg-accent1 p-8">
            <h1 className="h-fit font-humane text-max font-bold capitalize">
              Extensive range
              <br /> of products
            </h1>
            <div className="flex w-full items-end justify-between gap-8">
              <div className="flex w-fit items-center justify-center gap-4">
                <Image src={dlogo} alt="logo" className="h-8 w-auto" />
                <p className="text-head font-semibold">maxnova healthcare</p>
              </div>
              <p className="w-fit text-subhead">
                Hassle-free product
                <br /> manufacturing and delivery
              </p>
            </div>
          </div>
          <div className="flex h-1/2 w-full gap-8">
            <div className="relative h-full w-1/2 overflow-hidden rounded-3xl">
              <Image
                src={dropper}
                alt="x"
                className="right-0 top-0 h-full w-full object-cover object-center"
              />
            </div>
            <div className="bg-seco flex h-full w-1/2 flex-col items-center justify-center gap-6 rounded-3xl p-8">
              {[
                "Unique Products",
                "Variety Of Products",
                "High Quality",
                "Cost-effective",
                "Personalized",
              ].map((text) => (
                <p
                  key={text}
                  className="text-4xl font-semibold transition-all duration-200 hover:scale-110 hover:text-accent1 dark:hover:text-accent2"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex h-full w-1/3 flex-col gap-8 space-x-0 space-y-0">
          <div className="relative h-2/3 w-full overflow-hidden rounded-3xl bg-secondary">
            <Image
              src={dropper}
              alt="x"
              className="absolute z-0 h-full w-full object-cover object-center opacity-50"
            />
            <div className="z-10 flex h-full w-full flex-col items-center justify-between p-8 text-secondary">
              <p className="z-10 text-subhead font-bold">maxnova</p>
              <p className="z-10 text-center text-subhead capitalize">
                Short product development cycle & Brand-specific products with
                Specialised consultation
              </p>
            </div>
          </div>
          <div className="flex h-1/3 w-full flex-col items-center justify-between rounded-3xl bg-accent2 p-8 text-accent1 dark:bg-accent1">
            <Image src={wlogo} alt="logo" className="h-8 w-auto" />
            <p className="text-center text-4xl font-semibold transition-all duration-200">
              Value driven and quality conscious
            </p>
            <p className="z-10 text-subhead font-bold">maxnova</p>
          </div>
        </div>
      </div>
    </section>
  );
}
