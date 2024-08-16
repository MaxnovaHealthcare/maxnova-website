"use client";

import React from "react";
import HorizontalScrollCarousel from "./horizontal-scroll";
import CTAButtons from "../buttons";
import WhyUS from "../whyus";
import { motion } from "framer-motion";

import OtherServices from "../ourservices";

export default function CustomFormulationsPage() {
  return (
    <main className="bg-prim z-0 flex min-h-screen w-screen snap-y flex-col">
      <section className="bg-prim flex h-screen min-h-screen w-full flex-col items-center justify-center p-12 px-6 max-md:mt-20 max-md:min-h-[75vh] max-md:p-4 lg:mt-10">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative flex h-full w-full items-center justify-center rounded-3xl bg-accent1"
        >
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center font-humane font-bold max-md:text-8xl lg:text-max"
          >
            BE DIFFERENT.
            <br /> BE A CUT ABOVE THE REST
          </motion.h1>
        </motion.div>
      </section>
      <section className="flex min-h-screen flex-col items-start justify-start p-12 px-0">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="z-[1] flex w-full flex-col items-center justify-center gap-4 max-md:px-4"
        >
          <h1 className="text-center font-humane font-semibold max-md:text-8xl lg:text-max">
            HOW DOES IT WORK?
          </h1>
          <p className="w-1/2 text-center text-para max-md:w-full">
            Private label manufacturing process -: From product selection to the
            final order, our entire process of private label is created keeping
            the benefits and overall growth of our clients as the core focus.
          </p>
          <CTAButtons
            cta="../contact"
            text="enquire now"
            bgcolor="bg-accent1"
          />
        </motion.div>
        <HorizontalScrollCarousel />
      </section>
      <section className="-mt-24 flex min-h-screen flex-col items-start justify-start px-4 max-md:-mt-20">
        <WhyUS />
      </section>
      <section className="flex min-h-screen flex-col items-start justify-start">
        <OtherServices />
      </section>
    </main>
  );
}
