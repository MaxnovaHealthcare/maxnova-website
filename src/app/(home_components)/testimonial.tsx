"use client";

import React, { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  name: string;
  company: string;
  testimonial: string;
  image?: string;
}

const TestimonialCard: React.FC<Testimonial> = ({
  name,
  company,
  testimonial,
  image,
}) => {
  const defaultAvatar = useMemo(
    () => `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 70)}`,
    [],
  );

  return (
    <div className="relative flex h-[42vh] w-full flex-col items-center justify-center space-y-4 overflow-hidden rounded-3xl bg-primary p-6 shadow-md">
      <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-gray-300">
        <Image
          src={image || defaultAvatar}
          alt={name}
          fill
          quality={100}
          className="object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = defaultAvatar;
          }}
        />
      </div>
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-600">{company}</p>
      <p className="text-center text-gray-700">{testimonial}</p>
    </div>
  );
};

interface TestimonialColumnProps {
  testimonials: Testimonial[];
  initialY: string;
}

const TestimonialColumn: React.FC<TestimonialColumnProps> = ({
  testimonials,
  initialY,
}) => {
  const repeatedTestimonials = useMemo(
    () => [...testimonials, ...testimonials],
    [testimonials],
  );

  return (
    <div className="relative flex h-[120vh] w-full flex-col">
      <motion.div
        className="absolute flex h-fit w-full flex-col space-y-6"
        initial={{ y: initialY }}
        animate={{ y: initialY === "-50%" ? "0%" : "-50%" }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {repeatedTestimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </motion.div>
    </div>
  );
};

interface TestimonialProps {
  testimonials?: Testimonial[];
}

const Testimonial: React.FC<TestimonialProps> = ({ testimonials = [] }) => {
  const [columnCount, setColumnCount] = useState(2);

  useEffect(() => {
    const updateColumnCount = () => {
      setColumnCount(window.innerWidth < 768 ? 1 : 2);
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  const columns = useMemo(() => {
    return Array.from({ length: columnCount }, (_, i) =>
      testimonials.filter((_, index) => index % columnCount === i),
    );
  }, [testimonials, columnCount]);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center gap-12 overflow-hidden max-md:m-0 max-md:mt-16 max-md:min-h-0 max-md:flex-col-reverse max-md:gap-8 lg:p-12 lg:px-4">
      {testimonials.length > 0 ? (
        <div className="flex h-screen min-h-screen w-1/2 gap-6 overflow-hidden max-md:h-[20rem] max-md:w-full max-md:flex-col">
          {columns.map((columnTestimonials, index) => (
            <TestimonialColumn
              key={index}
              testimonials={columnTestimonials}
              initialY={index % 2 === 0 ? "-50%" : "0%"}
            />
          ))}
        </div>
      ) : (
        <p className="text-subhead text-gray-700 max-md:text-xl">
          No testimonials available.
        </p>
      )}
      <div className="sticky top-0 flex h-full w-1/2 flex-col items-start justify-start space-y-6 max-md:h-fit max-md:w-full">
        <h2 className="font-humane text-max uppercase text-accent2 max-md:text-8xl max-md:leading-[1]">
          What Our Clients <br /> Say About Us
        </h2>
        <p className="text-subhead max-md:text-xl">
          Discover the success stories of our happy customers who’ve experienced
          remarkable results with our services!
        </p>
      </div>
    </section>
  );
};

export default Testimonial;
