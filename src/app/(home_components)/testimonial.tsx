"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  name: string;
  company: string;
  testimonial: string;
  image?: string;
}

const TestimonialCard = ({
  name,
  company,
  testimonial,
  image,
}: Testimonial) => (
  <div className="relative flex h-[42vh] w-full flex-col items-center justify-center space-y-4 overflow-hidden rounded-3xl bg-primary p-6">
    <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-gray-300">
      <Image
        src={image ? image : "https://i.pravatar.cc/300?img=43"}
        alt={name}
        fill
        className="object-cover"
      />
    </div>
    <h3 className="text-lg font-bold">{name}</h3>
    <p className="text-sm text-gray-600">{company}</p>
    <p className="text-center text-gray-700">{testimonial}</p>
  </div>
);

const TestimonialColumn = ({
  testimonials,
  initialY,
}: {
  testimonials: Testimonial[];
  initialY: string;
}) => (
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
      {[...testimonials, ...testimonials].map((testimonial, index) => (
        <TestimonialCard key={index} {...testimonial} />
      ))}
    </motion.div>
  </div>
);

interface TestimonialProps {
  testimonials?: Testimonial[];
}

export default function Testimonial({ testimonials = [] }: TestimonialProps) {
  const columnCount = 2;
  const columns = Array.from({ length: columnCount }, (_, i) =>
    testimonials.filter((_, index) => index % columnCount === i),
  );

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center gap-12 overflow-hidden max-md:m-0 max-md:mt-16 max-md:h-screen lg:h-screen lg:p-12 lg:px-4">
      {testimonials.length > 0 ? (
        <div className="flex h-screen min-h-screen w-1/2 gap-6 overflow-hidden max-md:hidden">
          {columns.map((columnTestimonials, index) => (
            <TestimonialColumn
              key={index}
              testimonials={columnTestimonials}
              initialY={index % 2 === 0 ? "-50%" : "0%"}
            />
          ))}
        </div>
      ) : (
        <p className="text-subhead text-gray-700">No testimonials available.</p>
      )}
      <div className="sticky top-0 flex h-full w-1/2 flex-col items-start justify-start space-y-6">
        <h2 className="font-humane text-max">
          What Our Clients <br /> Say About Us
        </h2>
        <p className="text-subhead text-gray-700">
          Hear from our happy customers who have experienced outstanding results
          with our services.
        </p>
      </div>
    </section>
  );
}
