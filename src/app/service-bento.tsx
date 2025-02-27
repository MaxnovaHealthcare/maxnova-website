"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ContactPage from "./contact";
import { useContactContext } from "./context/contact-context";
import icon0 from "./../../public/images/derma.svg";
import icon1 from "./../../public/images/cosmo.svg";
import icon2 from "./../../public/images/neutra.svg";
import icon3 from "./../../public/images/ayurv.svg";
import arrow from "./../../public/images/arrow.svg";
import Link from "next/link";

interface Verticals {
  _id: string;
  name: string;
  description: string;
  image: string;
  icon: any;
}

interface BentoData {
  box1_image: string;
  value1_image: string;
  value2_image: string;
  value1_head: string;
  value2_head: string;
  value1_desc: string;
  value2_desc: string;
  contact_image: string;
}

const fetchData = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch data from ${url}`);
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export default function ServiceBento() {
  const { open, toggleContact } = useContactContext();
  const [verticals, setVerticals] = useState<Verticals[]>([]);
  const [bentoData, setBentoData] = useState<BentoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const icons = [icon0, icon1, icon2, icon3];

    const loadData = async () => {
      try {
        // Fetch both data sources in parallel
        const [categoriesData, bentoResponse] = await Promise.all([
          fetchData("http://localhost:4000/api/category"),
          fetchData("http://localhost:4000/api/utils/get-bento"),
        ]);

        // Process categories data
        const categoriesWithIcons = categoriesData.allCategory.map(
          (category: any, index: number) => ({
            ...category,
            icon: icons[index % icons.length],
          }),
        );
        setVerticals(categoriesWithIcons);
        if (bentoResponse && bentoResponse.length > 0) {
          setBentoData(bentoResponse[0].service_bento);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <section className="grid h-fit min-h-[70rem] w-full items-center justify-center">
        <div className="text-center">Loading services...</div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="grid h-fit min-h-[70rem] w-full items-center justify-center">
        <div className="text-center text-red-500">Error: {error}</div>
      </section>
    );
  }

  return (
    <section className="grid h-fit min-h-[70rem] w-full grid-cols-4 grid-rows-3 items-center justify-center gap-[1rem] px-12">
      <div className="relative col-span-2 row-span-2 h-full w-full overflow-hidden rounded-2xl border px-4 py-8">
        <h1 className="z-[1] font-humane text-max font-bold text-primary">
          WE HAVE R&D FEATURED APPROACH
        </h1>
        {bentoData?.box1_image && (
          <Image
            src={bentoData.box1_image}
            fill
            alt="box1_image"
            className="absolute right-0 top-0 z-[-1] h-full w-full object-cover brightness-90 filter"
          />
        )}
      </div>

      {verticals.map((vertical) => (
        <div
          key={vertical._id}
          className="relative col-span-1 row-span-1 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border bg-accent1 px-4 py-8 text-accent2"
        >
          <div className="relative flex h-fit w-full items-center justify-between">
            <div className="relative h-[2.5rem] w-[2.5rem] overflow-hidden">
              <Image priority src={vertical.icon} fill alt={vertical.name} />
            </div>
            <Link
              href={`/verticals/${vertical._id}`}
              className="relative flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-lg bg-accent2 p-2"
            >
              <Image
                priority
                src={arrow}
                height={20}
                width={20}
                alt={vertical.name}
              />
            </Link>
          </div>
          <div className="flex h-fit w-full flex-col items-start justify-center text-accent2">
            <h1 className="font-humane text-[3.5rem] font-medium uppercase leading-[0.9]">
              {vertical.name}
            </h1>
            <p className="text-min leading-[1.1]">
              {vertical.description?.split(".")[0]}.
            </p>
          </div>
        </div>
      ))}
      <div className="relative col-span-1 row-span-1 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border bg-accent1 px-4 py-8 text-accent2">
        <div className="relative flex h-fit w-full items-center justify-start">
          <div className="relative h-[2.5rem] w-[2.5rem] overflow-hidden">
            <Image
              priority
              src={bentoData?.value1_image || ""}
              fill
              alt="value1_image"
            />
          </div>
        </div>
        <div className="flex h-fit w-full flex-col items-start justify-center text-accent2">
          <h1 className="font-humane text-[3.5rem] font-medium uppercase leading-[0.9]">
            {bentoData?.value1_head}
          </h1>
          <p className="text-min leading-[1.1]">{bentoData?.value1_desc}.</p>
        </div>
      </div>
      <div className="relative col-span-1 row-span-1 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border bg-accent1 px-4 py-8 text-accent2">
        <div className="relative flex h-fit w-full items-center justify-start">
          <div className="relative h-[2.5rem] w-[2.5rem] overflow-hidden">
            <Image
              priority
              src={bentoData?.value2_image || ""}
              fill
              alt="value1_image"
            />
          </div>
        </div>
        <div className="flex h-fit w-full flex-col items-start justify-center text-accent2">
          <h1 className="font-humane text-[3.5rem] font-medium uppercase leading-[0.9]">
            {bentoData?.value2_head}
          </h1>
          <p className="text-min leading-[1.1]">{bentoData?.value2_desc}.</p>
        </div>
      </div>
      <div className="relative col-span-2 row-span-1 flex h-full w-full items-center justify-between gap-4 overflow-hidden rounded-2xl border bg-accent2 p-4">
        <div className="flex h-full w-full flex-col items-start justify-between p-0">
          <div className="flex h-fit w-full flex-col items-start justify-between gap-0">
            <p className="text-para text-primary">Let&apos;s Connect</p>
            <h2 className="text-wrap font-humane text-[7rem] font-bold uppercase leading-[0.9] text-primary">
              What about a call?
            </h2>
          </div>
          <button
            onClick={toggleContact}
            className="w-fit text-nowrap rounded-full bg-accent1 px-4 py-3 text-min font-semibold text-accent2 transition-colors hover:bg-opacity-90 md:mt-0 md:w-auto"
          >
            Contact Us
          </button>
        </div>
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
          <Image
            src={bentoData?.contact_image || ""}
            alt="Contact visual"
            fill
            className="h-full w-full rounded-3xl object-cover"
          />
        </div>
      </div>
      {open && <ContactPage className="" onClick={toggleContact} />}
    </section>
  );
}
