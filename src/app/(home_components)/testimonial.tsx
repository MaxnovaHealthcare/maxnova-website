"use client";

import React, { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  name: string;
  company: string;
  testimonial: string;
}

const TestimonialCard: React.FC<Testimonial> = ({
  name,
  company,
  testimonial
}) => {
  const defaultAvatar = useMemo(
    () => `https://i.pravatar.cc/300?img=${ Math.floor(Math.random() * 70) }`,
    [],
  );

  return (
    <div className="relative flex h-[24rem] w-full flex-col items-center justify-center space-y-4 overflow-hidden rounded-3xl bg-primary p-6 shadow-md">
      <h3 className="text-subhead text-center font-bold">{ name }</h3>
      <p className="text-para text-center text-gray-600">{ company }</p>
      <p className="text-center text-gray-700">{ testimonial }</p>
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
        initial={ { y: initialY } }
        animate={ { y: initialY === "-50%" ? "0%" : "-50%" } }
        transition={ {
          duration: 15,
          ease: "linear",
          repeat: Infinity,
        } }
      >
        { repeatedTestimonials.map((testimonial, index) => (
          <TestimonialCard key={ index } { ...testimonial } />
        )) }
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
      { testimonials.length > 0 ? (
        <div className="flex h-screen min-h-screen w-1/2 gap-6 px-2 overflow-hidden max-md:h-[20rem] max-md:w-full max-md:flex-col">
          { columns.map((columnTestimonials, index) => (
            <TestimonialColumn
              key={ index }
              testimonials={ columnTestimonials }
              initialY={ index % 2 === 0 ? "-50%" : "0%" }
            />
          )) }
        </div>
      ) : (
        <p className="text-subhead text-gray-700 max-md:text-xl">
          No testimonials available.
        </p>
      ) }
      <div className="sticky top-0 flex h-full w-1/2 flex-col items-start justify-start space-y-6 max-md:h-fit max-md:w-full">
        <h2 className="font-humane text-max uppercase text-accent2 max-md:text-8xl max-md:leading-[1]">
          More Than a <br /> Manufacturer
        </h2>
        <p className="text-subhead max-md:text-xl">
          { `We believe in building trust through every interaction, not just through the products we make. That's what keeps our clients coming back and what keeps their customers coming back to them.` }        </p>
      </div>
    </section>
  );
};

export default Testimonial;
