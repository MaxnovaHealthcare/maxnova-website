"use client";

import React from "react";
import HeroSection from "./(home_components)/hero";
import AboutSection from "./(home_components)/about";
import Showreel from "./(home_components)/showreel";
import WhyUS from "./whyus";
import OtherServices from "./ourservices";
import ProductOverview from "./(home_components)/topproduct";

export default function HomePage() {
  return (
    <main className="bg-prim z-0 m-0 flex min-h-screen w-screen snap-y flex-col items-center justify-center px-4">
      <HeroSection />
      <AboutSection />
      <Showreel />
      <WhyUS />
      <OtherServices />
      <ProductOverview />
    </main>
  );
}
