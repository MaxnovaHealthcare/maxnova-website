"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "./(home_components)/hero";
import AboutSection from "./(home_components)/about";
import Showreel from "./(home_components)/showreel";
import WhyUS from "./whyus";
import OtherServices from "./ourservices";
import ProductOverview from "./(home_components)/topproduct";

async function getHomeData() {
  const res = await fetch("http://localhost:4000/api/utils/get-home");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function HomePage() {
  const [homedata, sethomeData] = useState<{
    head_hero: string;
    spline_hero: string;
    subhead_about: string;
    text_about: string;
    image_about: string;
    image_alt_about: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHomeData()
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          sethomeData(data[0]);
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!homedata) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-prim z-0 m-0 flex min-h-screen w-screen snap-y flex-col items-center justify-center px-4">
      <HeroSection
        head_hero={homedata.head_hero}
        spline_hero={homedata.spline_hero}
      />
      <AboutSection
        subhead_about={homedata.subhead_about}
        text_about={homedata.text_about}
        image_about={homedata.image_about}
        image_alt_about={homedata.image_alt_about}
      />
      <Showreel />
      <WhyUS />
      <OtherServices />
      <ProductOverview />
    </main>
  );
}
