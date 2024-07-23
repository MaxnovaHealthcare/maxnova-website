"use client";

import React from "react";

export default function About() {
  return (
    <section className="bg-prim m-0 flex h-screen min-h-screen w-full items-center justify-center gap-12 px-24 py-12">
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
      </div>
      <div className="relative flex h-full w-8/12 flex-col items-end justify-end p-4">
        <h1 className="z-10 -mb-16 w-1/2 text-right font-humane text-max font-bold">
          THAT&rsquo;S HOW WE GOT HERE
        </h1>
        <div className="h-3/4 w-4/5 rounded-3xl bg-accent1">y</div>
      </div>
    </section>
  );
}
