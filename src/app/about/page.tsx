"use client";

import React, { useEffect, useState, useCallback } from "react";
import Hero from "./(about_components)/heroabout";
import About from "./(about_components)/aboutus";
import Certification from "./(about_components)/certification";
import Numbers from "../(home_components)/numbers";
import VisMis from "./(about_components)/mission";
import Showreel from "../(home_components)/showreel";
import HorizontalScrollCarousel from "../horizontal-scroll";
import { motion } from "framer-motion";

async function fetchData(endpoint: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/utils/${endpoint}`,
    );
    if (!res.ok) throw new Error(`Failed to fetch data: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint} data:`, error);
    return null;
  }
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<any | null>(null);
  const [homeData, setHomeData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = useCallback(async () => {
    const [aboutRes, homeRes] = await Promise.allSettled([
      fetchData("get-about"),
      fetchData("get-home"),
    ]);

    if (aboutRes.status === "fulfilled" && aboutRes.value?.length > 0) {
      setAboutData(aboutRes.value[0]);
    } else {
      setError("No about data available");
    }

    if (homeRes.status === "fulfilled" && homeRes.value?.length > 0) {
      setHomeData(homeRes.value[0]);
    } else {
      setError("No home data available");
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return (
    <main className="bg-prim z-0 m-0 flex min-h-screen w-full flex-col">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <Hero
            subhead={aboutData?.subhead_hero ?? ""}
            imagearr={aboutData?.image || []}
          />
          <section className="w-full px-4">
            <About
              subhead_about={aboutData?.subhead_about ?? ""}
              text_about={aboutData?.text_about ?? ""}
              image_about={aboutData?.image_about ?? ""}
              image_alt_about={aboutData?.image_alt_about ?? ""}
            />
          </section>
          <section className="z-[5] -mb-24 h-full w-full overflow-hidden rounded-b-[2.5rem] bg-primary">
            <Numbers numbs={homeData?.numbs ?? []} sindex={3} eindex={6} />
          </section>
          <section className="z-[0] w-full">
            <VisMis
              image_alt_vm={aboutData?.image_alt_vm ?? ""}
              image_vm={aboutData?.image_vm ?? ""}
              subhead_vm1={aboutData?.subhead_vm1 ?? ""}
              subhead_vm2={aboutData?.subhead_vm2 ?? ""}
              text_vm1={aboutData?.text_vm1 ?? ""}
              text_vm2={aboutData?.text_vm2 ?? ""}
            />
          </section>
          <section className="z-[5] -mt-24 w-full overflow-hidden rounded-t-[2.5rem] bg-primary px-1">
            <Showreel video_name="about" />
          </section>
          <section className="relative flex flex-col items-start justify-start px-0 py-24 max-md:py-12">
            <h1 className="ml-4 font-humane font-bold uppercase text-accent2 max-md:text-8xl lg:text-max">
              the values we <br />
              admire and follow
            </h1>

            <HorizontalScrollCarousel steps={aboutData?.values || []} />
          </section>
          <section className="w-full px-4">
            <Certification />
          </section>
          <section className="flex w-full flex-col items-center justify-center gap-4 px-4 max-md:py-24">
            <motion.h1
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="font-humane font-bold uppercase text-accent2 max-md:text-8xl lg:text-max"
            >
              Locate us
            </motion.h1>

            <div className="flex w-full gap-8 px-4 max-md:flex-col">
              <div className="relative h-[28rem] w-full overflow-hidden">
                <iframe
                  className="h-full w-full rounded-xl"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d62234.183275580755!2d76.749839!3d30.3929382!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fb5e3c0b4b035%3A0xddb4968a13aebb2c!2sMaxnova%20Healthcare%20%E2%80%93%20Contract%20Manufacturer%20for%20Ayurveda%2C%20Nutraceuticals%2C%20Cosmetics%20%26%20Dermaceuticals!5e1!3m2!1sen!2sin!4v1741066321698!5m2!1sen!2sin"
                ></iframe>
                <div className="absolute bottom-0 left-0 z-[1] m-0 flex h-fit w-full items-center justify-center rounded-b-xl border-t border-accent1 bg-gradient-to-r from-accent1 from-10% via-accent1/25 to-accent1 to-90% px-6 pt-4 font-humane text-[7rem] font-semibold uppercase leading-[1] text-primary max-md:text-8xl">
                  The Office
                </div>
              </div>
              <div className="relative h-[28rem] w-full overflow-hidden">
                <iframe
                  className="h-full w-full rounded-xl"
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3865.7712786443158!2d76.77867507559039!3d30.987056674462618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDU5JzEzLjQiTiA3NsKwNDYnNTIuNSJF!5e1!3m2!1sen!2sin!4v1741067411455!5m2!1sen!2sin"
                ></iframe>
                <div className="absolute bottom-0 left-0 z-[1] m-0 flex h-fit w-full items-center justify-center rounded-b-xl border-t border-accent1 bg-gradient-to-r from-accent1 from-10% via-accent1/25 to-accent1 to-90% px-6 pt-4 font-humane text-[7rem] font-semibold uppercase leading-[1] text-primary max-md:text-8xl">
                  The Factory
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
