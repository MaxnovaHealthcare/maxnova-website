"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import dropper from "../../public/images/dropper.png";
import CTAButtons from "./buttons";
import { useContactContext } from "./context/contact-context";

interface ProductCardProps {
  name: string;
  subbrand: string;
  image?: string;
  ingredients?: string;
  usp?: string;
  category?: string;
  toogleEnquire?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  subbrand,
  ingredients = "",
  usp = "",
  category,
  image = "",
  toogleEnquire,
}) => {
  const ingredientList = ingredients.split("+");
  const uspList = usp.split("+");
  const { open, setCompanyData, toggleContact } = useContactContext();

  const dataCompany = {
    company_name: subbrand,
    category_name: category,
    name: name,
  };

  const setData = () => {
    setCompanyData(dataCompany);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.5,
        duration: 0.5,
        ease: "linear",
      }}
      className="relative z-50 flex h-[32rem] w-[22rem] flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl bg-accent2 p-6 text-primary"
    >
      <Image
        src={image}
        alt={name}
        width={28 * 16}
        height={19 * 16}
        className="h-full w-full overflow-hidden rounded-3xl object-fill"
      />
      <div className="flex h-[10%] w-full items-end justify-between">
        <h1 className="font-helvetica text-para font-semibold capitalize">
          {name}
        </h1>
        <p className="font-helvetica text-para font-semibold capitalize">
          {subbrand}
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, type: "linear", delay: 0.25 }}
        className="absolute z-50 m-2 flex h-full w-full flex-col items-start justify-between gap-4 rounded-2xl bg-accent2 p-6 text-primary backdrop-blur-md"
      >
        <h1 className="h-fit font-humane text-7xl font-semibold">{name}</h1>

        <div className="flex h-full w-full flex-col items-start justify-start gap-4">
          <div className="flex items-start justify-start gap-2">
            <span className="flex flex-wrap space-x-1 space-y-0">
              <p className="font-semibold">USP:</p>
              {uspList.map((item, index) => (
                <span className="flex flex-wrap capitalize" key={index}>
                  {`${index !== 0 ? " · " : "· "}${item}`}
                </span>
              ))}
            </span>
          </div>
          <div className="flex items-start justify-start gap-2">
            <span className="flex flex-wrap space-x-1 space-y-0">
              <p className="font-semibold">Ingredients:</p>
              {ingredientList.map((item, index) => (
                <p className="text-wrap capitalize" key={index}>
                  {`${index === 0 ? " " : ""}${item}${
                    index === ingredientList.length - 1 ? "" : ", "
                  }`}
                </p>
              ))}
            </span>
          </div>
        </div>
        <div className="flex h-fit w-full items-center justify-between">
          <CTAButtons text="ask us" cta="" onClick={setData} />
          <h1 className="text-para font-medium capitalize">{category}</h1>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
