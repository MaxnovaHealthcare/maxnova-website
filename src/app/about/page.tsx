"use client";

import React, { useEffect } from "react";
import Hero from "./(about_components)/heroabout";
import About from "./(about_components)/aboutus";
import Certification from "./(about_components)/certification";

export default function AboutPage() {
  return (
    <main className="bg-prim z-0 flex min-h-screen w-screen snap-y flex-col">
      <Hero />
      <About />
      <Certification />
    </main>
  );
}
