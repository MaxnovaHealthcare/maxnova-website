"use client";

import React from "react";
import HeroSection from "./(home_components)/hero";
import AboutSection from "./(home_components)/about";
import Showreel from "./(home_components)/showreel";
import WhyUs from "./(home_components)/whyus";
import PCD from "./(home_components)/pcd";
import ProductOverview from "./(home_components)/product";

export default function HomePage() {
  return (
    <main className="-z-10 flex min-h-screen w-screen snap-y flex-col">
      <HeroSection />
      <AboutSection />
      <Showreel />
      <WhyUs />
      <PCD />
      <ProductOverview />
    </main>
  );
}
