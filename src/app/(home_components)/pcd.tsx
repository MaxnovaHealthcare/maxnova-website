"use client";

import React from "react";

export default function PCD() {
  return (
    <section className="bg-prim relative flex h-fit min-h-screen w-screen flex-col gap-12 px-6 py-12 md:px-24">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="w-1/2 text-center font-humane text-max font-bold">
          BEGIN YOUR BRAND JOURNEY WITH US
        </h1>
        <p className="w-3/4 text-center text-para">
          Anybody with some prior knowledge about medicine or the Pharma
          industry can start a PCD franchise business. This business does not
          involve a hefty amount of capital. If you are convinced of its
          benefits and want to step into this business but wondering, how to
          start it.
        </p>
      </div>
      <div className="flex items-center justify-between gap-12">
        <div className="h-[32rem] w-full rounded-3xl bg-accent1"></div>
        <div className="h-[32rem] w-full rounded-3xl bg-accent1"></div>
        <div className="h-[32rem] w-full rounded-3xl bg-accent1"></div>
      </div>
    </section>
  );
}
