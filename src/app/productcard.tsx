"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useContactContext } from "./context/contact-context";
import { useProductModal } from "./hooks/useProductModal";

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
  const { openModal } = useProductModal();
  const { setCompanyData } = useContactContext();

  const dataCompany = {
    company_name: subbrand,
    category_name: category,
    name: name,
  };

  const setData = () => {
    setCompanyData(dataCompany);
  };

  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "linear" }}
      whileHover="hover"
      className="z-50 flex h-[32rem] w-[20rem] flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl bg-accent2 p-4 text-primary"
    >
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl">
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.05 }}
          variants={{
            hover: { scale: 1 },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Image
            src={image}
            alt={name}
            fill
            quality={100}
            className="h-full w-full object-cover"
          />
        </motion.div>
        <motion.div
          onClick={() =>
            openModal({ name, subbrand, image, ingredients, usp, category })
          }
          initial={{ y: 64, scale: 1 }}
          variants={{
            hover: { y: -8, scale: 0.95 },
          }}
          transition={{ duration: 0.3, ease: "easeIn", delay: 0.1 }}
          className={`absolute bottom-0 h-fit w-fit rounded-full border-2 border-primary bg-accent2 px-6 py-3 text-min font-medium capitalize text-primary`}
        >
          View More
        </motion.div>
      </div>
      <div className="flex h-fit min-h-[3.2rem] w-full items-end justify-between px-2">
        <h1 className="font-helvetica text-para font-medium capitalize">
          {name}
        </h1>
        <p className="font-helvetica text-para font-normal capitalize">
          {subbrand}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
