"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -100]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/category`,
      );
      if (!res.ok) throw new Error("Failed to fetch categories");

      const data = await res.json();
      if (!data?.allCategory || !Array.isArray(data.allCategory)) {
        throw new Error("Invalid data format");
      }

      setCategories(data.allCategory);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <section
      ref={ref}
      className="relative flex h-auto w-full flex-col gap-6 p-12 max-md:p-4 max-md:px-0 max-md:py-24 lg:px-10"
    >
      <motion.h1
        style={{ y: y1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "linear" }}
        className="z-[3] font-humane text-max font-bold uppercase text-accent2 max-md:w-full max-md:text-center max-md:text-8xl"
      >
        Diverse Operations <br /> across Various Verticals
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
          <div className="grid w-fit grid-cols-2 gap-16 max-md:w-full max-md:grid-cols-1 max-md:gap-8 max-md:p-4">
            {categories.map((category) => (
              <Link
                className="max-md:h-full max-md:w-full"
                key={category._id}
                href={`/verticals/${category._id}`}
              >
                <VerticalCard name={category.name} image={category.image} />
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

const VerticalCard: React.FC<CardProps> = ({ name, image }) => {
  const refcard = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative flex aspect-[3/2] w-[30rem] items-center justify-center overflow-hidden rounded-3xl max-md:w-full">
      <motion.div
        ref={refcard}
        whileHover={{ scale: 1.025 }}
        transition={{ duration: 0.25, ease: "linear" }}
        className="relative flex h-[20.625rem] w-[30rem] items-center justify-center overflow-hidden rounded-3xl p-8 text-primary max-md:h-[65vh] max-md:w-full max-md:p-4"
      >
        <Image
          src={image || "/images/default-placeholder.jpg"}
          alt={`${name} vertical`}
          fill
          quality={100}
          className="z-[0] h-full w-full object-cover brightness-[0.8] filter"
        />
        <h1 className="absolute z-[1] text-center font-humane text-8xl font-medium uppercase text-primary max-md:text-7xl">
          {name}
        </h1>
      </motion.div>
    </div>
  );
};
