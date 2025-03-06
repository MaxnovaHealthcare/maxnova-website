"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

import HeroSection from "./(home_components)/hero";
import WhereQuality from "./(home_components)/quality";
import Showreel from "./(home_components)/showreel";
import OtherServices from "./ourservices";
import MarqueeEffect from "./marquee";
import Testimonial from "./(home_components)/testimonial";
import FaqSection from "./(home_components)/faq";
import Certification from "./about/(about_components)/certification";
import Verticals from "./(home_components)/verticals";
import AboutBrief from "./(home_components)/about";
import Numbers from "./(home_components)/numbers";

const fetchData = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch data from ${url}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const Hero = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full bg-accent1">
      {isMobile ? (
        <div className="relative flex h-[50vh] flex-col items-center justify-center overflow-hidden">
          <video
            className="h-auto w-full scale-[1.2] object-cover"
            src={`/images/herosection.mp4`}
            autoPlay
            muted
            playsInline
          />
        </div>
      ) : (
        <HeroSection />
      )}
    </section>
  );
};

const HomePage = () => {
  const [homeData, setHomeData] = useState<{
    head_hero: string;
    subhead_about: string;
    text_about: string;
    image_about1: string;
    image_alt_about1: string;
    image_about2: string;
    image_alt_about2: string;
    subhead_quality: string;
    text_quality: string;
    image_quality: string;
    image_alt_quality: string;
    slogan: string;
    faqs: any[];
    numbs: any[];
  } | null>(null);

  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const verticalsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.hash === "#verticals"
    ) {
      setTimeout(() => {
        verticalsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 750);
    }
  }, [params]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/utils/get-home`,
      );
      if (data && Array.isArray(data) && data.length > 0) {
        setHomeData(data[0]);
      } else {
        setError("Failed to load home data");
      }
    };
    loadData();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!homeData) return <h1>Loading...</h1>;

  return (
    <main className="z-0 m-0 flex min-h-screen w-full flex-col bg-accent1">
      <Hero />
      <section className="h-fit w-full rounded-t-[4rem] bg-primary max-md:rounded-t-3xl">
        <AboutBrief
          subhead_about={homeData.subhead_about}
          text_about={homeData.text_about}
          image1_about={homeData.image_about1}
          image1_alt_about={homeData.image_alt_about1}
          image2_about={homeData.image_about2}
          image2_alt_about={homeData.image_alt_about2}
        />
      </section>

      <section className="w-full bg-primary">
        <Numbers numbs={homeData.numbs} sindex={0} eindex={3} />
      </section>

      <section id="verticals" className="w-full bg-primary" ref={verticalsRef}>
        <Verticals />
      </section>

      <section className="w-full bg-primary">
        <Showreel video_name="home" />
      </section>

      <section className="w-full bg-primary">
        <OtherServices />
      </section>

      <section className="w-full bg-primary">
        <WhereQuality
          subhead_quality={homeData.subhead_quality}
          text_quality={homeData.text_quality}
          image_quality={homeData.image_quality}
          image_alt_quality={homeData.image_alt_quality}
        />
      </section>

      <section className="w-full bg-accent2 text-primary">
        <MarqueeEffect>
          <h1 className="mt-4 font-humane text-9xl font-bold uppercase max-md:mt-2 max-md:text-7xl max-md:font-medium">
            {homeData.slogan}
          </h1>
        </MarqueeEffect>
      </section>

      <section className="w-full bg-primary px-4 py-12">
        <Certification />
      </section>

      <section className="w-full bg-primary px-4">
        <Testimonial testimonials={testimonials} />
      </section>

      <section className="w-full bg-primary px-4">
        <FaqSection faqs={homeData.faqs} />
      </section>
    </main>
  );
};

const testimonials = [
  {
    name: "John Doe",
    company: "Company A",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisl vel odio posuere tincidunt. Nullam nec erat ut mi fermentum ultricies.",
    image: "",
  },
  {
    name: "Jane Doe",
    company: "Company B",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisl vel odio posuere tincidunt. Nullam nec erat ut mi fermentum ultricies.",
    image: "",
  },
];

export default HomePage;
