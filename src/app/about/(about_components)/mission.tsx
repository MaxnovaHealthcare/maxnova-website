import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface VisMisProps {
  subhead_vm1: string;
  subhead_vm2: string;
  text_vm1: string;
  text_vm2: string;
  image_vm: string;
  image_alt_vm: string;
}

const VisMis: React.FC<VisMisProps> = ({
  subhead_vm1,
  subhead_vm2,
  text_vm1,
  text_vm2,
  image_vm,
  image_alt_vm,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      ref={ref}
      className="flex w-full flex-col items-center justify-center gap-12 py-24"
    >
      <motion.h1
        style={{ y: x1 }}
        initial={{ y: 0, opacity: 0 }}
        whileInView={{ y: 50, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        viewport={{ once: true }}
        className="z-[1] text-right font-humane font-bold uppercase text-accent2 max-md:w-full max-md:text-center max-md:text-8xl max-md:leading-[0.9] lg:-mb-16 lg:text-max"
      >
        Our vision empowers our mission
      </motion.h1>

      <div className="flex w-full items-center justify-center">
        {/* Left Content */}
        <div className="flex w-full flex-col justify-center gap-6 px-4 max-md:w-full">
          <h1 className="text-subhead font-semibold max-md:text-xl">
            {subhead_vm1}
          </h1>
          <p className="text-para">
            {text_vm1?.split("|").map((para, index) => (
              <React.Fragment key={index}>
                {para}
                <br />
                <br />
              </React.Fragment>
            )) || "This is about"}
          </p>
        </div>

        <div className="relative aspect-[3/2] h-auto w-full min-w-[32rem] overflow-hidden rounded-2xl">
          <Image
            src={image_vm}
            alt={image_alt_vm}
            fill
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="flex w-full flex-col justify-center gap-6 p-4 max-md:w-full">
          <h1 className="text-subhead font-semibold max-md:text-xl">
            {subhead_vm2}
          </h1>
          <p className="text-para">
            {text_vm2?.split("|").map((para, index) => (
              <React.Fragment key={index}>
                {para}
                <br />
                <br />
              </React.Fragment>
            )) || "This is about"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisMis;
