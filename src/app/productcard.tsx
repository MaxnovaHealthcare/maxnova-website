"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProductCard(props: any) {
  return (
    <motion.div className="relative flex h-[32rem] w-[22rem] items-center justify-center rounded-3xl bg-accent1">
      <Image
        src={props.src}
        alt={props.alt}
        layout="fill"
        objectFit="cover"
        className="h-full w-full rounded-3xl"
      />
      <motion.div className="absolute bottom-0 flex w-full items-center justify-between p-4">
        <h1 className="font-humane text-head font-medium">
          Name of the Product{props.name}
        </h1>
        <p className="font-humane text-head font-medium">
          Sub Brand{props.subbrand}
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-seco absolute flex h-[92.5%] w-[90%] flex-col items-start justify-between rounded-2xl p-4"
      >
        <h1 className="font-humane text-7xl font-semibold">
          Broad Spectrum SPF 50{props.name}
        </h1>
        <div className="flex h-1/2 w-full flex-col justify-between">
          <p>Ingredients:</p>
          <p>USP:</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
