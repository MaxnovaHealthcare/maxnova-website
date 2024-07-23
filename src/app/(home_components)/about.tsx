"use client";

import React from "react";
import Image from "next/image";
import CTAButtons from "../buttons";

export default function AboutSection() {
  return (
    <section className="bg-prim flex h-screen min-h-screen w-screen items-center justify-center gap-12 overflow-hidden px-24 py-12">
      <div className="relative flex h-full w-8/12 flex-col items-start justify-start p-4">
        <h1 className="z-10 -mb-16 w-3/4 font-humane text-max font-bold">
          THERE QUALITY IS GUARANTEED
        </h1>
        <div className="h-3/4 w-4/5 rounded-3xl bg-accent1">y</div>
      </div>
      <div className="flex h-full w-4/12 flex-col justify-center gap-12 p-4">
        <h1 className="text-head font-semibold">
          All the credits goes to each person working in the backend day and
          night for us.
        </h1>
        <p className="text-para">
          Maxnova group of companies is committed to delivering happiness in the
          form of &rsquo;good health&rsquo; in everyone&rsquo;s home.
          <br />
          <br />
          In the preceding years, Maxnova group of companies has encountered a
          massive growth rate which defines our strong presence in the
          industry.We are a leading manufacturer of high-quality Herbal
          Cosmetics, Nutraceuticals and Ayurvedic Beauty Products.
          <br />
          <br />
          Every time we put our extensive efforts into introducing the
          first-class cosmetic product, we are always in search of understanding
          your necessity.
        </p>
        <CTAButtons text="LEARN MORE" cta="" bgcolor="bg-accent1" />
      </div>
    </section>
  );
}
