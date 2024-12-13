"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import CTAButtons from "./buttons";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";

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
      <motion.div className="flex flex-col items-center justify-center gap-6 max-md:w-full max-md:flex-col">
        {filteredServices.map(({ title, image, imageAlt, text }: any) => (
          <ServiceSections
            key={title}
            href={`../${title.toLowerCase().replace(/ /g, "-")}`}
            heading={title}
            content={
              text || "Explore our exceptional services tailored for you."
            }
            image={image || ""}
            imageAlt={imageAlt || title}
          />
        ))}
      </motion.div>
    </section>
  );
}

interface ServiceProps {
  href: string;
  heading: string;
  content: string;
  image?: string;
  imageAlt?: string;
}

const ServiceSections = ({
  href,
  heading,
  content,
  image,
  imageAlt,
}: ServiceProps) => {
  return (
    <div className="flex h-fit w-full items-start justify-between">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="h-[30vw] w-1/2 px-12"
      >
        <div className="relative h-full w-10/12 overflow-hidden rounded-2xl bg-lime-200">
          <Image
            src={image || ""}
            alt={imageAlt || heading}
            fill
            className="object-cover object-center"
          />
        </div>
      </motion.div>
      <div className="flex w-1/2 flex-col items-start justify-start gap-12 px-12">
        <h1 className="text-subhead capitalize max-md:text-7xl">{heading}</h1>
        <p className="text-para max-md:text-3xl">{content}</p>
        <CTAButtons text={`View ${heading}`} cta={href} />
      </div>
    </div>
  );
};
