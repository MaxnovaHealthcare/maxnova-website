"use client";

import React, { useRef, useState, useEffect } from "react";
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      className="z-50 flex aspect-[20/32] w-[20rem] flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl bg-accent2 p-4 text-primary max-md:w-full"
    >
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl max-md:h-[80%]">
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
          className={`absolute bottom-0 h-fit w-fit rounded-full border-2 border-primary bg-accent2 px-6 py-3 text-min font-medium capitalize text-primary max-md:hidden max-md:text-sm`}
        >
          View More
        </motion.div>
        <motion.div
          onClick={() =>
            openModal({ name, subbrand, image, ingredients, usp, category })
          }
          transition={{ duration: 0.3, ease: "easeIn", delay: 0.1 }}
          className={`z-[1] absolute bottom-0 h-fit w-fit rounded-full border-2 border-primary bg-accent2 px-6 py-3 text-min font-medium capitalize text-primary mb-2 max-md:text-sm md:hidden`}
        >
          View More
        </motion.div>
      </div>
      <div className="flex h-fit min-h-[3.2rem] w-full items-end justify-between px-2 max-md:h-[20%] max-md:flex-col max-md:items-center max-md:p-0">
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
