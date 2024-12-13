"use client";

import React, { useEffect, useState } from "react";
import Hero from "./(about_components)/heroabout";
import About from "./(about_components)/aboutus";
import Certification from "./(about_components)/certification";
import Numbers from "../(home_components)/numbers";
import Research from "./(about_components)/research";
import Showreel from "../(home_components)/showreel";
import HorizontalScrollCarousel from "../horizontal-scroll";

async function getAboutData() {
  try {
    const res = await fetch(
      "https://maxnovabackend-38x5s.ondigitalocean.app/api/utils/get-about",
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching about data:", error);
    throw error;
  }
}

async function getHomeData() {
  try {
    const res = await fetch(
      "https://maxnovabackend-38x5s.ondigitalocean.app/api/utils/get-home",
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching about data:", error);
    throw error;
  }
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<{
    subhead_hero: string;
    image: string[];
    subhead_about: string;
    text_about: string;
    image_about: string;
    image_alt_about: string;
    subhead_research: string;
    text_research: string;
    image_research1: string;
    image_research2: string;
    image_alt_research1: string;
    image_alt_research2: string;
    values: any[];
  } | null>(null);

  const [homeData, setHomeData] = useState<{
    numbs: any[];
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await getAboutData();
        if (data && data.length > 0) {
          setAboutData(data[0]);
        } else {
          setError("No data available");
        }
      } catch (err) {
        setError((err as Error).message);
      }
    };

    const fetchHomeData = async () => {
      try {
        const data = await getHomeData();
        if (data && data.length > 0) {
          setHomeData(data[0]);
        } else {
          setError("No data available");
        }
      } catch (err) {
        setError((err as Error).message);
      }
    };
    fetchHomeData();
    fetchAboutData();
  }, []);

  return (
    <main className="bg-prim z-0 m-0 flex min-h-screen w-screen flex-col items-center justify-center px-4">
      <Hero
        subhead={aboutData?.subhead_hero ?? ""}
        imagearr={aboutData?.image || []}
      />
      <About
        subhead_about={aboutData?.subhead_about ?? ""}
        text_about={aboutData?.text_about ?? ""}
        image_about={aboutData?.image_about ?? ""}
        image_alt_about={aboutData?.image_alt_about ?? ""}
      />
      <Numbers numbs={homeData?.numbs ?? []} />
      <section className="my-24 w-full">
        <Research
          subhead_research={aboutData?.subhead_research ?? ""}
          text_research={aboutData?.text_research ?? ""}
          image1_research={aboutData?.image_research1 ?? ""}
          image2_research={aboutData?.image_research2 ?? ""}
          image1_alt_research={aboutData?.image_alt_research1 ?? ""}
          image2_alt_research={aboutData?.image_alt_research2 ?? ""}
        />
      </section>
      <section className="my-24 w-full">
        <Showreel height={40} />
      </section>
      <section className="w-screen ">
        <HorizontalScrollCarousel steps={aboutData?.values || []} />
      </section>
      <Certification />
    </main>
  );
}
