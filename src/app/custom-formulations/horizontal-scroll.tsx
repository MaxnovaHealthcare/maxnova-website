"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import React, { useRef, JSX } from "react";

interface CardProps {
  title: string;
  desc: string;
}

const cards: CardProps[] = [
  {
    title: "Understanding your requirements",
    desc: "First, we understand your market and product requirements & specifications. You come with a product concept and/or specifications & requirements. You can have Formulation or a Product specification document or Benchmark Product Sample",
  },
  {
    title: "Brainstorming",
    desc: "Our technical team brainstorms on your market & product specifications, regulatory requirements, technical and production scale feasibility and ease of material availability, etc. So, we can deliver the most suitable product that closely aligns with your product specifications while at the same time giving you confidence in getting it success in the market and building a strong brand. ",
  },
  {
    title: "Product formula development",
    desc: "We start developing a product formula that is most suitable to your needs. We prepare some laboratory samples and provide them to you for your evaluation & feedback. Based on your feedback, we fine-tune the product formulation. This may require some iterations of sampling & feedback. And then we finalize the product formulation once you are satisfied with the product sample and approve the same.",
  },
  {
    title: "Product packaging selection",
    desc: "While we work on developing the product formula, we also capture your product packaging requirements. We suggest you packaging options that are most suitable for your products & we finalize product packaging requirements. On your behalf, we handle all the challenges of choosing reliable suppliers and the right packaging that goes well with the product and gives the consumers the convenience of use.",
  },
  {
    title: "Cost estimations and approval",
    desc: "We give you product cost estimates based on your finalized product formulation and packaging requirements. Based on the cost estimations provided and the product samples provided you can make a wise decision on the viability of the product in your target market. If the product does not seem viable for you, based on your feedback we may rework the selected formulation or packaging to match your expectations and send you the final product sample for your check and approval before placing a confirmed purchase order.",
  },
  {
    title: "Product feasibility study",
    desc: "A packaging feasibility check is performed to see if the components of the package and the packaging of the completed product fulfill quality requirements and are safe from damage such as leaks, drops, and environmental impacts. We do a basic feasibility check at this point to confirm if the selected formulation and its packaging can go hand-in-hand. Later on, after order confirmation, we do a detailed feasibility study.",
  },
];

const Card = ({
  card,
  index,
}: {
  card: CardProps;
  index: number;
}): JSX.Element => (
  <div
    key={index}
    className="dark:-[#f2f0ea] flex h-max min-h-[40rem] w-[27.5rem] flex-col items-start justify-between overflow-hidden rounded-3xl border border-accent1 p-6 max-md:min-h-[36rem] max-md:w-[22rem]"
  >
    <div className="flex h-fit w-full flex-col items-start justify-start">
      <p className="font-humane text-[3rem] uppercase">
        {index < 10 ? "0" : ""}
        {++index}
      </p>
      <p className="font-humane text-7xl font-semibold uppercase">
        {card.title}
      </p>
    </div>
    <div className="flex w-full flex-col items-start justify-start gap-2">
      <p className="text-para">{card.desc}</p>
    </div>
  </div>
);

export default function HorizontalScrollCarousel(): JSX.Element {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const x1 = useTransform(
    scrollYProgress,
    [0, 1],
    ["1%", `-${cards.length * (20 - 1.81 * cards.length)}%`],
  );
  const x2 = useTransform(
    scrollYProgress,
    [0, 1],
    ["1%", `-${cards.length * (25 - 1.81 * cards.length)}%`],
  );

  const getWindowWidth = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 0;
  };

  const x = getWindowWidth() < 768 ? x2 : x1;

  const sectionHeight = `${cards.length * 100}vh`;

  return (
    <section
      ref={targetRef}
      className="relative"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex space-x-24 max-md:space-x-12">
          {cards.map((card, index) => (
            <Card card={card} key={index} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
