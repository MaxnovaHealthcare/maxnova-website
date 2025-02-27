"use client";

import React, { useState, useEffect, useRef } from "react";
import HeroSection from "./(home_components)/hero.jsx";
import WhereQualtiy from "./(home_components)/quality";
import Showreel from "./(home_components)/showreel";
import { useParams } from "next/navigation";
import OtherServices from "./ourservices";
import MarqueeEffect from "./marquee";
import Testimonial from "./(home_components)/testimonial";
import FaqSection from "./(home_components)/faq";
import Certification from "./about/(about_components)/certification";
import Verticals from "./(home_components)/verticals";
import AboutBrief from "./(home_components)/about";
import Numbers from "./(home_components)/numbers";

async function fetchData(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function HomePage() {
  const [homedata, sethomeData] = useState<{
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

  const [services, setServices] = useState<any[]>([]);
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
    const loadAllData = async () => {
      try {
        const homeDataRes = await fetchData(
          "https://maxnovabackend-38x5s.ondigitalocean.app/api/utils/get-home",
        );

        if (homeDataRes.length > 0) {
          sethomeData(homeDataRes[0]);
        }

        const [pcdRes, pvtRes, customRes] = await Promise.all([
          fetchData(
            "https://maxnovabackend-38x5s.ondigitalocean.app/api/utils/get-pcd",
          ),
          fetchData(
            "https://maxnovabackend-38x5s.ondigitalocean.app/api/utils/get-pvt",
          ),
          fetchData(
            "https://maxnovabackend-38x5s.ondigitalocean.app/api/utils/get-custom",
          ),
        ]);

        const transformedServices = [
          {
            key: "pcd-franchise",
            title: "PCD Franchise",
            text: pcdRes[0]?.text_pcd || "Default PCD text.",
            image: pcdRes[0]?.image_pcd || "",
            imageAlt: pcdRes[0]?.image_alt_pcd || "PCD Franchise",
            href: "/pcd-franchise",
          },
          {
            key: "private-label",
            title: "Private Label",
            text: pvtRes[0]?.text_pvt || "Default Private Label text.",
            image: pvtRes[0]?.image_pvt || "",
            imageAlt: pvtRes[0]?.image_alt_pvt || "Private Label",
            href: "/private-label",
          },
          {
            key: "custom-formulations",
            title: "Custom Formulations",
            text:
              customRes[0]?.text_custom || "Default Custom Formulations text.",
            image: customRes[0]?.image_custom || "",
            imageAlt: customRes[0]?.image_alt_custom || "Custom Formulations",
            href: "/custom-formulations",
          },
        ];

        setServices(transformedServices);
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadAllData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!homedata || !services.length) {
    return <h1>Loading</h1>;
  }

  return (
    <main className="z-0 m-0 flex min-h-screen w-full snap-y flex-col bg-accent1">
      <HeroSection head={homedata.head_hero} />
      <section className="w-full rounded-t-[4rem] bg-primary max-md:rounded-3xl">
        <AboutBrief
          subhead_about={homedata.subhead_about}
          text_about={homedata.text_about}
          image1_about={homedata.image_about1}
          image1_alt_about={homedata.image_alt_about1}
          image2_about={homedata.image_about2}
          image2_alt_about={homedata.image_alt_about2}
        />
      </section>
      <section className="w-full bg-primary">
        <Numbers numbs={homedata.numbs} sindex={0} eindex={3} />
      </section>
      <section id="verticals" className="w-full bg-primary">
        <Verticals />
      </section>
      <section className="w-full bg-primary px-4">
        <Showreel height={"90vh"} />
      </section>
      <section className="w-full bg-primary">
        <OtherServices />
      </section>
      <section className="w-full bg-primary">
        <WhereQualtiy
          subhead_quality={homedata.subhead_quality}
          text_quality={homedata.text_quality}
          image_quality={homedata.image_quality}
          image_alt_quality={homedata.image_alt_quality}
        />
      </section>
      <section className="w-full bg-accent2 text-primary">
        <MarqueeEffect>
          <h1 className="mt-4 font-humane text-9xl font-bold uppercase">
            {homedata.slogan}
          </h1>
        </MarqueeEffect>
      </section>
      <section className="w-full bg-primary px-4">
        <Certification />
      </section>
      <section className="w-full bg-primary px-4">
        <Testimonial testimonials={testimonials} />
      </section>
      <section className="w-full bg-primary px-4">
        <FaqSection faqs={homedata.faqs} />
      </section>
    </main>
  );
}

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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisl velodio posuere tincidunt. Nullam nec erat ut mi fermentum ultricies.",
    image: "",
  },
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisl vel posuere tincidunt. Nullam nec erat ut mi fermentum ultricies.",
    image: "",
  },
];
