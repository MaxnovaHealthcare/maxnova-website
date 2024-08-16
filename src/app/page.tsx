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
    <Page>
      <HeroSection />
      <AboutSection />
      <Showreel />
      <WhyUS />
      <OtherServices />
      <ProductOverview />
    </Page>
  );
}

export function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-prim z-0 m-0 flex min-h-screen w-screen snap-y flex-col items-center justify-center px-4">
      {children}
    </div>
  );
}
