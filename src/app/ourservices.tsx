"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import CTAButtons from "./buttons";

async function fetchData(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function OtherServices() {
  const [services, setServices] = useState<any[]>([]);

  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  const currentPage = pathname?.split("/").pop();

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const filteredServices = useMemo(() => {
    if (!services || !Array.isArray(services)) return [];

    return services.filter((service: any) => {
      const slug = service?.title?.toLowerCase().replace(/ /g, "-");
      return slug && slug !== currentPage;
    });
  }, [currentPage, services]);

  useEffect(() => {
    const loadAllData = async () => {
      try {
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
            slogan: pcdRes[0]?.slogan || "Default PCD slogan.",
            image: pcdRes[0]?.image_pcd || "",
            imageAlt: pcdRes[0]?.image_alt_pcd || "PCD Franchise",
            href: "/pcd-franchise",
          },
          {
            key: "private-label",
            title: "Private Label",
            text: pvtRes[0]?.text_pvt || "Default Private Label text.",
            slogan: pvtRes[0]?.slogan || "Default Private Label slogan.",
            image: pvtRes[0]?.image_pvt || "",
            imageAlt: pvtRes[0]?.image_alt_pvt || "Private Label",
            href: "/private-label",
          },
          {
            key: "custom-formulations",
            title: "Custom Formulations",
            text:
              customRes[0]?.text_custom || "Default Custom Formulations text.",
            slogan:
              customRes[0]?.slogan || "Default Custom Formulations slogan.",
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

  return (
    <section className="relative flex h-fit w-full flex-col gap-12 p-12 py-36 max-md:p-4 max-md:px-0 lg:px-10">
      <div className="flex items-center justify-center gap-4">
        <motion.h1
          ref={ref}
          style={{ y: y1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5, ease: "linear" }}
          className="w-1/2 text-center font-humane text-max font-bold text-accent2 max-md:w-full max-md:text-center max-md:text-8xl"
        >
          VIEW OUR <br /> OTHER SERVICES
        </motion.h1>
      </div>
      <motion.div className="grid w-full grid-cols-3 items-center justify-center max-md:w-full max-md:flex-col">
        {filteredServices.map(
          ({ title, image, imageAlt, text, slogan }: any) => (
            <div key={title} className="flex items-center justify-center">
              <ServiceSections
                href={`../${title.toLowerCase().replace(/ /g, "-")}`}
                heading={title}
                slogan={slogan || ""}
                image={image || ""}
                imageAlt={imageAlt || title}
              />
            </div>
          ),
        )}
      </motion.div>
    </section>
  );
}

interface ServiceProps {
  href: string;
  heading: string;
  slogan: string;
  image?: string;
  imageAlt?: string;
}

const ServiceSections = ({
  href,
  heading,
  slogan,
  image,
  imageAlt,
}: ServiceProps) => {
  const splitSlogan = (text: string): string[] => {
    const words = text.split(" ");

    if (words.length <= 1) return [text];
    const midpoint = Math.floor(words.length / 2);

    return [
      words.slice(0, midpoint).join(" "),
      words.slice(midpoint).join(" "),
    ];
  };

  const [first, second] = splitSlogan(slogan);
  return (
    <div className="relative flex h-[36rem] w-[24rem] items-center justify-center overflow-hidden rounded-3xl">
      <Image
        src={image || "/default-image.jpg"}
        alt={imageAlt || "Default Alt Text"}
        width={320}
        height={200}
        className="h-full w-full rounded-3xl object-cover brightness-[0.8] filter"
      />
      <div className="absolute z-[1] flex h-full w-full flex-col items-center justify-between p-6 py-16 text-primary">
        <h1 className="text-para font-semibold">{heading}</h1>
        <p className="text-center font-humane text-[7.5rem] font-normal uppercase leading-[0.9]">
          {first}
          <br />
          {second}
        </p>
        <CTAButtons text={`View ${heading}`} cta={href} />
      </div>
    </div>
  );
};
