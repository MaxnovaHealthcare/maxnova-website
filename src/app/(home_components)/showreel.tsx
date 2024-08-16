"use client";

import React from "react";

export default function Showreel() {
  return (
    <section className="flex h-screen min-h-screen w-full flex-col items-center justify-center p-12 max-md:p-4 lg:px-10">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-accent1">
        <h1 className="absolute font-humane text-max font-bold uppercase max-md:text-8xl">
          SHOWREEL
        </h1>
      </div>
    </section>
  );
}
