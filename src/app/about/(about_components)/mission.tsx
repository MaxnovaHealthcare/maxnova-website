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
      className="relative flex w-full flex-col items-center justify-center gap-12"
    >
      <div className="relative grid w-full grid-cols-2 items-center justify-center gap-12 p-12 py-36 max-md:grid-cols-1 max-md:px-4">
        <motion.h1
          style={{ y: x1 }}
          initial={{ y: 0, opacity: 0 }}
          whileInView={{ y: 50, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="z-[1] text-left font-humane font-bold uppercase text-primary max-md:w-full max-md:text-center max-md:text-8xl max-md:leading-[0.9] lg:-mb-16 lg:text-max"
        >
          Our vision empowers our mission
        </motion.h1>
        <Image
          src={image_vm}
          alt={image_alt_vm}
          fill
          className="absolute z-[-1] h-full w-full object-cover brightness-[0.8] filter"
        />
        <div className="flex h-full w-full flex-col justify-center gap-6 rounded-3xl border-2 border-accent1 bg-accent2/50 p-8 text-primary filter backdrop-blur-xl max-md:w-full max-md:gap-2 max-md:p-4">
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

        <div className="flex h-full w-full flex-col justify-center gap-6 rounded-3xl border-2 border-accent1 bg-accent2/50 p-8 text-primary filter backdrop-blur-xl max-md:w-full max-md:gap-2 max-md:p-4">
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
