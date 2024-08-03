"use client";

import React from "react";
import Image from "next/image";
import maxnovabanner from "../../../public/images/maxnovabanner.jpg";

export default function Showreel() {
  return (
    <section className="flex h-screen min-h-screen w-screen flex-col items-center justify-center px-6 py-12 md:px-24">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-accent1">
        <h1 className="absolute font-humane text-max font-bold uppercase">
          SHOWREEL
        </h1>
        <Image
          src={maxnovabanner}
          alt="showreel"
          className="h-full w-full scale-105 object-cover"
        />
      </div>
    </section>
  );
}
