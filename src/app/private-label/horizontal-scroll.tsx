"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import React, { useRef, JSX } from "react";

export default function HorizontalScrollCarousel(): JSX.Element {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["1%", `-${cards.length * 9.5}%`],
  );

  return (
    <section
      ref={targetRef}
      className={`bg-prim relative h-[${cards.length * 100}vh]`}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex space-x-24">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
}

const Card = ({ card }: { card: CardType }): JSX.Element => {
  return (
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
};
type CardType = {
  url: string;
  title: string;
  desc: string;
  id: number;
};

let cards: CardType[] = [
  {
    url: "",
    title: "Understanding your requirements",
    desc: "First, we understand your market and product requirements & specifications. You come with a product concept and/or specifications & requirements. You can have a product concept or a product specification document. We will help you to convert your product concept into a product specification document.",
    id: 1,
  },
  {
    url: "",
    title: "Product selection from available stock products",
    desc: "If you do not have an idea of which formulation to add, what packaging to choose, or what actives to add. Then we can suggest you some of our Existing Product Formulations. And If you want us to formulate a similar product to our Existing Developed products, we can formulate the same for you.",
    id: 2,
  },
  {
    url: "",
    title: "Sample evaluation with minor customizations",
    desc: "If you choose to formulate a product from our Existing Formulations, we will provide you with a sample of the product. You can evaluate the sample and suggest any minor customizations required in the product.",
    id: 3,
  },
  {
    url: "",
    title: "Cost estimations and approval",
    desc: "We give you product cost estimates based on your finalized product formulation and packaging requirements. You approve the costing and place a confirmed purchase order.",
    id: 4,
  },
  {
    url: "",
    title: "Order confirmation",
    desc: "You approve the costing and product specifications and place a confirmed order for commercial production and process the advance payment as per the agreed payment terms. Once you confirm the order, based on your approval of the formulation and packaging, a systematic process for the new product order processing will be triggered.",
    id: 5,
  },
];
