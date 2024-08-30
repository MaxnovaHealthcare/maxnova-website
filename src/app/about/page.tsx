"use client";

import React, { useEffect, useState } from "react";
import Hero from "./(about_components)/heroabout";
import About from "./(about_components)/aboutus";
import Certification from "./(about_components)/certification";

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

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<{
    subhead_hero: string;
    image: string[];
    subhead_about: string;
    text_about: string;
    image_about: string;
    image_alt_about: string;
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

    fetchAboutData();
  }, []);

  return (
    <main className="bg-prim z-0 m-0 flex min-h-screen w-screen snap-y flex-col items-center justify-center px-4">
      {error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <>
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
          <Certification />
        </>
      )}
    </main>
  );
}
