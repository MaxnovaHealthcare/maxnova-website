"use client";

import React from "react";
import Splinediv from "./spline";

export default  function HeroSection() {
  return (
    <section className="flex h-screen min-h-screen w-screen flex-col items-center justify-center p-12 px-6 md:mt-10 md:p-12">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-accent1">
        <Splinediv />
        <h1 className="absolute bottom-0 left-0 p-6 font-humane text-9xl font-bold">
          WE ARE THE LEADING <br /> COSMETIC MANUFACTURER.
        </h1>
      </div>
    </section>
  );
}
