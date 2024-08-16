"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Certification() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center gap-6 p-12 px-4">
      <div className="flex w-1/2 flex-col items-center justify-center gap-4 max-md:w-full">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5, ease: "linear" }}
          className="text-center font-humane font-bold max-md:text-8xl lg:text-max"
        >
          YOU CAN TRUST ON US WE ARE AUTHENTIC
        </motion.h1>
      </div>
      <div className="grid h-full grid-cols-2 grid-rows-subgrid gap-24 max-md:grid-cols-1">
        <CertificateCard />
        <CertificateCard />
      </div>
    </section>
  );
}

function CertificateCard() {
  return (
    <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }} className="flex h-full w-full flex-col items-center justify-center gap-6">
      <div className="-[#fdc921] flex h-[40rem] w-[27.5rem] items-center justify-center rounded-3xl border bg-accent1 p-8 max-md:h-[65vh] max-md:w-full max-md:p-4"></div>
      <h1 className="w-4/5 text-center text-head font-semibold">
        ceritficate of blah blah blah
      </h1>
    </motion.div>
  );
}
