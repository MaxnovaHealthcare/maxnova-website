"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CardLink: React.FC<{ href: string; title: string }> = ({
  href,
  title,
}) => (
  <Link
    href={href}
    className="flex h-[40rem] w-[27.5rem] items-center justify-center rounded-3xl border-[0.5px] border-[#130d14]"
  >
    <h1 className="flex flex-wrap text-wrap font-humane text-8xl font-semibold uppercase">
      {title}
    </h1>
  </Link>
);

export default function OtherServices() {
  const pathname = usePathname();
  const currentPage = pathname?.split("/").pop(); // Extract the current page from the pathname

  const servicesArray = useMemo(() => {
    switch (currentPage) {
      case "pcd-franchise":
        return ["Private Label", "Custom Formulations"];
      case "private-label":
        return ["PCD Franchise", "Custom Formulations"];
      case "custom-formulations":
        return ["PCD Franchise", "Private Label"];
      default:
        return ["PCD Franchise", "Private Label", "Custom Formulations"];
    }
  }, [currentPage]);

  return (
    <section className="relative flex h-fit min-h-screen w-screen flex-col gap-12 px-6 py-12 md:px-24">
      <div className="flex items-center justify-end gap-4">
        <h1 className="w-1/2 text-right font-humane text-max font-bold">
          VIEW OUR <br /> OTHER SERVICES
        </h1>
      </div>
      <div className="flex items-center justify-end gap-12">
        {servicesArray.map((title) => (
          <CardLink
            key={title}
            href={`../${title.toLowerCase().replace(" ", "-")}`}
            title={title}
          />
        ))}
      </div>
    </section>
  );
}
