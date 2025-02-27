"use client";

import React, { useEffect, useState } from "react";
import Hero from "./(about_components)/heroabout";
import About from "./(about_components)/aboutus";
import Certification from "./(about_components)/certification";
import Numbers from "../(home_components)/numbers";
import VisMis from "./(about_components)/mission";
import Showreel from "../(home_components)/showreel";
import HorizontalScrollCarousel from "../horizontal-scroll";
import { motion } from "framer-motion";

async function getAboutData() {
  try {
    const res = await fetch(
      "https://maxnovabackend-38x5s.ondigitalocean.app/api/utils/get-about",
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    console.log("res", res);
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
    values: any[];
    image_alt_vm: string;
    image_vm: string;
    subhead_vm1: string;
    subhead_vm2: string;
    text_vm1: string;
    text_vm2: string;
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
  console.log("aboutData", aboutData);
  return (
    <main className="bg-prim z-0 m-0 flex min-h-screen w-full flex-col items-center justify-center px-4">
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
      <Numbers numbs={homeData?.numbs ?? []} sindex={3} eindex={6} />
      <section className="w-full">
        <VisMis
          image_alt_vm={aboutData?.image_alt_vm ?? ""}
          image_vm={aboutData?.image_vm ?? ""}
          subhead_vm1={aboutData?.subhead_vm1 ?? ""}
          subhead_vm2={aboutData?.subhead_vm2 ?? ""}
          text_vm1={aboutData?.text_vm1 ?? ""}
          text_vm2={aboutData?.text_vm2 ?? ""}
        />
      </section>
      <section className="w-full px-4">
        <Showreel height={"75vh"} />
      </section>
      <section className="w-full">
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 64, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="z-[1] w-3/5 font-humane font-bold uppercase text-accent2 max-md:w-full max-md:text-center max-md:text-8xl lg:-mb-16 lg:text-max"
        >
          The values we <br />
          admire and follow
        </motion.h1>
        <HorizontalScrollCarousel steps={aboutData?.values || []} />
      </section>
      <Certification />
    </main>
  );
}
