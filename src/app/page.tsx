"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
    if (!res.ok) throw new Error(`Failed to fetch data from ${ url }`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const Hero = () => {
  const [useThreeJS, setUseThreeJS] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768,
  );

  const isWebGLSupported = () => {
    if (typeof window === "undefined") return false;
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    setUseThreeJS(isWebGLSupported());
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full bg-accent1 relative h-full flex justify-center items-center">
      { isMobile || !useThreeJS ? (
        <div className="relative flex h-[50vh] flex-col items-center justify-center overflow-hidden">
          <video
            className="h-auto w-full scale-[1.2] object-cover"
            src={ `/images/herosection.mp4` }
            autoPlay
            muted
            playsInline
          />
        </div>
      ) : (
        <HeroSection />
      ) }
      <motion.p
        initial={ { opacity: 0, y: "100%" } }
        animate={ { opacity: 1, y: "0%" } }
        transition={ { duration: 0.75, delay: 2 } }
        className="absolute bottom-4 md:bottom-8 z-[1] w-full text-pretty text-center text-head font-semibold text-white max-md:text-xl"
      >
        { `Build Your Brand. We'll Handle the Science.` }
      </motion.p>
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
        `${ process.env.NEXT_PUBLIC_BACKEND_API }/api/utils/get-home`,
      );
      if (data && Array.isArray(data) && data.length > 0) {
        setHomeData(data[0]);
      } else {
        setError("Failed to load home data");
      }
    };
    loadData();
  }, []);

  if (error) return <div className="text-red-500">Error: { error }</div>;
  return (
    <main className="z-0 m-0 flex min-h-screen w-full flex-col bg-accent1">
      <Hero />
      <section className="h-fit w-full rounded-t-[4rem] bg-primary max-md:rounded-t-3xl">
        <AboutBrief
          subhead_about={ homeData?.subhead_about || "" }
          text_about={ homeData?.text_about || "" }
          image1_about={ homeData?.image_about1 || "" }
          image1_alt_about={ homeData?.image_alt_about1 || "" }
          image2_about={ homeData?.image_about2 || "" }
          image2_alt_about={ homeData?.image_alt_about2 || "" }
        />
      </section>

      <section className="w-full bg-primary">
        <Numbers
          numbs={ Array.isArray(homeData?.numbs) ? homeData.numbs : [] }
          sindex={ 0 }
          eindex={ 3 }
        />
      </section>

      <section id="verticals" className="w-full bg-primary" ref={ verticalsRef }>
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
          subhead_quality={ homeData?.subhead_quality || "" }
          text_quality={ homeData?.text_quality || "" }
          image_quality={ homeData?.image_quality || "" }
          image_alt_quality={ homeData?.image_alt_quality || "" }
        />
      </section>

      <section className="w-full bg-accent2 text-primary">
        <MarqueeEffect >
          <h1 className="mt-4 font-humane text-9xl font-bold uppercase max-md:mt-2 max-md:text-7xl max-md:font-medium">
            { homeData?.slogan }
          </h1>
        </MarqueeEffect>
      </section>

      <section className="w-full bg-primary px-4 py-12">
        <Certification />
      </section>

      <section className="w-full bg-primary px-4">
        <Testimonial testimonials={ testimonials } />
      </section>

      <section className="w-full bg-primary px-4">
        <FaqSection faqs={ Array.isArray(homeData?.faqs) ? homeData.faqs : [] } />
      </section>
    </main>
  );
};

const testimonials = [
  {
    "name": "Dr. Tarang",
    "company": "Nascent Derm",
    "testimonial": "I've been working with Maxnova for years, and the experience has always been smooth. The product quality is excellent, packaging is reliable, and the team is responsive and professional. I trust them completely and look forward to continuing our partnership."
  },
  {
    "name": "Dr. N. S. Shreyas",
    "company": "Padmashree Enterprises",
    "testimonial": "I've been working with Maxnova for years and have always found their products reliable and well-packaged. Their staff is responsive, and their customer care has consistently met expectations. I'm happy with the overall experience."
  },
  {
    "name": "Mancode Team",
    "company": "Mancode",
    "testimonial": "Our experience with Maxnova has been excellent. The product they manufacture for us is exceptional. They are well-designed, efficiently produced, and consistently appreciated by our customers."
  },
  {
    "name": "Mr. Saksham Batra",
    "company": "Auraeceutics Aesthetic Healthcare",
    "testimonial": "We're proud to be associated with Maxnova. Their focus on science, packaging, and innovative product combinations stands out. The quality is top-notch, and their support, especially during new launches, has been incredibly prompt and helpful."
  }, {
    "name": "Ritika Suryavanshi",
    "company": "Herbal Glow Essentials",
    "testimonial": "I came in with just an idea and a lot of questions. Maxnova guided me through every step and helped turn it into something real. The process was smooth, and the final product turned out better than I imagined."
  },
  {
    "name": "Amitesh Chauhan",
    "company": "AyuraVeda Skincare",
    "testimonial": "Working with Maxnova felt like having an in-house R&D team. I never had to chase updates, everything was transparent and on track. I could focus on building the brand, while they handled the backend."
  },
  {
    "name": "Nivriti Botanicals",
    "company": "Cosmetic Brand",
    "testimonial": "Professional, fast, and never cutting corners. We've worked with other manufacturers, but Maxnova stood out. They care deeply about what goes into the product, and it shows in every stage of their work."
  },
  {
    "name": "Sandeep Bhargava",
    "company": "NutraVibe Labs",
    "testimonial": "Their quality speaks for itself. From sourcing to packaging, every detail was handled with care. Our customers love the product, and we’re already preparing for the next launch with Maxnova."
  },
  {
    "name": "Meenal Deshmukh",
    "company": "PurelyU Personal Care",
    "testimonial": "It felt more like a partnership than a transaction. Maxnova didn’t just manufacture our product, they helped shape it. The team was responsive, thoughtful, and truly invested in getting it right."
  },
  {
    "name": "Harshita Menon",
    "company": "Wellnest Naturals",
    "testimonial": "They made a complex process feel simple. As a first-time brand, we expected it to be overwhelming, but Maxnova made it clear and manageable. They handled the technical side with ease and kept us fully in the loop."
  },
];

export default HomePage;
