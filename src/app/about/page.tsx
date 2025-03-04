"use client";

import React, { useEffect, useState } from "react";
import Hero from "./(about_components)/heroabout";
import About from "./(about_components)/aboutus";
import Certification from "./(about_components)/certification";
import Numbers from "../(home_components)/numbers";
import VisMis from "./(about_components)/mission";
import Showreel from "../(home_components)/showreel";
// import Map from "./(about_components)/map";
import HorizontalScrollCarousel from "../horizontal-scroll";
import { motion } from "framer-motion";

async function getAboutData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/utils/get-about`,
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
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/utils/get-home`,
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
      <section className="flex w-full flex-col items-center justify-center gap-4">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="font-humane font-bold uppercase text-accent2 max-md:text-8xl lg:text-max"
        >
          Find us here
        </motion.h1>

        <div className="flex w-full gap-8 px-4">
          <iframe
            className="w-full rounded-xl"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d62234.183275580755!2d76.749839!3d30.3929382!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fb5e3c0b4b035%3A0xddb4968a13aebb2c!2sMaxnova%20Healthcare%20%E2%80%93%20Contract%20Manufacturer%20for%20Ayurveda%2C%20Nutraceuticals%2C%20Cosmetics%20%26%20Dermaceuticals!5e1!3m2!1sen!2sin!4v1741066321698!5m2!1sen!2sin"
          ></iframe>
          <iframe
            className="w-full rounded-xl"
            height="450"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3865.7712786443158!2d76.77867507559039!3d30.987056674462618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDU5JzEzLjQiTiA3NsKwNDYnNTIuNSJF!5e1!3m2!1sen!2sin!4v1741067411455!5m2!1sen!2sin"
          >
            Our Office
          </iframe>
        </div>
      </section>
    </main>
  );
}
