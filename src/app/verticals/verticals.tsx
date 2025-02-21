"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

interface Category {
  _id: string;
  name: string;
  description: string;
  image: string;
}

export default function Verticals() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -100]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          `https://maxnovabackend-38x5s.ondigitalocean.app/api/category`,
        );
        if (!res.ok) throw new Error("Failed to fetch categories");

        const data = await res.json();
        setCategories(data.allCategory);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex h-auto w-full flex-col gap-6 p-12 py-24 max-md:p-4 max-md:px-0 lg:px-10"
    >
      <motion.h1
        style={{ y: y1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5, ease: "linear" }}
        className="z-[3] font-humane text-max font-bold uppercase text-accent2 max-md:w-full max-md:text-center max-md:text-8xl"
      >
        We Operate in <br /> Various Verticals
      </motion.h1>

      <div className="flex w-full items-center justify-center">
        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-500">Error: {error}</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            No categories available
          </p>
        ) : (
          <div className="grid w-fit grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-2">
            {categories.map((category, index) => (
              <Link key={index} href={`/verticals/${category._id}`}>
                <VerticalCard
                  key={index}
                  name={category.name}
                  image={category.image}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

interface CardProps {
  name: string;
  image: string;
}

const VerticalCard = ({ name, image }: CardProps) => {
  const refcard = useRef(null);
  return (
    <div className="relative flex h-[20.625rem] w-[30rem] items-center justify-center overflow-hidden rounded-3xl">
      <motion.div
        ref={refcard}
        whileHover={{ scale: 1.025 }}
        transition={{ duration: 0.25, ease: "linear" }}
        className="relative flex h-[20.625rem] w-[30rem] items-center justify-center overflow-hidden rounded-3xl p-8 text-primary max-md:h-[65vh] max-md:w-full max-md:p-4"
      >
        <Image
          src={image}
          alt={`${name} vertical`}
          fill
          className="z-[0] h-full w-full object-cover brightness-[0.8] filter"
        />
        <h1 className="absolute z-[1] text-center font-humane text-8xl font-medium uppercase text-primary max-md:text-7xl">
          {name}
        </h1>
      </motion.div>
    </div>
  );
};
