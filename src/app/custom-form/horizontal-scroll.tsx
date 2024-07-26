"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import React, { useRef, JSX } from "react";

interface CardProps {
  url: string;
  title: string;
  desc: string;
  id: number;
}

const cards: CardProps[] = [
  {
    url: "",
    title: "Understanding your requirements",
    desc: "First, we understand your market and product requirements & specifications. You come with a product concept and/or specifications & requirements. You can have Formulation or a Product specification document or Benchmark Product Sample",
    id: 1,
  },
  {
    url: "",
    title: "Brainstorming",
    desc: "Our technical team brainstorms on your market & product specifications, regulatory requirements, technical and production scale feasibility and ease of material availability, etc. So, we can deliver the most suitable product that closely aligns with your product specifications while at the same time giving you confidence in getting it success in the market and building a strong brand. ",
    id: 2,
  },
  {
    url: "",
    title: "Product formula development",
    desc: "We start developing a product formula that is most suitable to your needs. We prepare some laboratory samples and provide them to you for your evaluation & feedback. Based on your feedback, we fine-tune the product formulation. This may require some iterations of sampling & feedback. And then we finalize the product formulation once you are satisfied with the product sample and approve the same.",
    id: 3,
  },
  {
    url: "",
    title: "Product packaging selection",
    desc: "While we work on developing the product formula, we also capture your product packaging requirements. We suggest you packaging options that are most suitable for your products & we finalize product packaging requirements. On your behalf, we handle all the challenges of choosing reliable suppliers and the right packaging that goes well with the product and gives the consumers the convenience of use.",
    id: 4,
  },
  {
    url: "",
    title: "Cost estimations and approval",
    desc: "We give you product cost estimates based on your finalized product formulation and packaging requirements. Based on the cost estimations provided and the product samples provided you can make a wise decision on the viability of the product in your target market. If the product does not seem viable for you, based on your feedback we may rework the selected formulation or packaging to match your expectations and send you the final product sample for your check and approval before placing a confirmed purchase order.",
    id: 5,
  },
  {
    url: "",
    title: "Product feasibility study",
    desc: "A packaging feasibility check is performed to see if the components of the package and the packaging of the completed product fulfill quality requirements and are safe from damage such as leaks, drops, and environmental impacts. We do a basic feasibility check at this point to confirm if the selected formulation and its packaging can go hand-in-hand. Later on, after order confirmation, we do a detailed feasibility study.",
    id: 6,
  },
  {
    url: "",
    title: "Order confirmation",
    desc: "Once You approve the costing and product specifications, place a confirmed order for commercial production, and process the advance payment as per the agreed payment terms. Once you confirm the order, based on your approval of the formulation and packaging, a systematic process for the new product order processing will be triggered.",
    id: 7,
  },
];

const Card = ({ card }: { card: CardProps }): JSX.Element => (
  <div
    key={card.id}
    className="bg-prim flex h-max min-h-[42rem] w-[28rem] flex-col items-start justify-between overflow-hidden rounded-3xl border-[0.5px] border-[#27251f] p-6"
  >
    <div className="flex h-fit w-full flex-col items-start justify-start">
      <p className="font-humane text-[3rem] uppercase">
        {card.id < 10 ? "0" : ""}
        {card.id}
      </p>
      <p className="font-humane text-8xl font-semibold uppercase">
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
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["1%", `-${cards.length * 11}%`],
  );

  const sectionHeight = `${cards.length * 100}vh`;

  return (
    <section
      ref={targetRef}
      className="bg-prim relative"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex space-x-24">
          {cards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
