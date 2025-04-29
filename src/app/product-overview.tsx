"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useProductModal } from "./hooks/useProductModal";

const ProductOverview = () => {
  const { isOpen, closeModal, product } = useProductModal();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeModal]);

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed left-0 top-0 z-[50] flex h-full w-full items-center justify-center overflow-hidden bg-accent1/20 bg-fixed px-16 pb-2 pt-[5.25rem] text-primary filter backdrop-blur max-md:p-2 max-md:px-2 max-md:pt-2"
        onClick={closeModal}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative flex h-full w-full overflow-x-hidden overflow-y-visible rounded-3xl bg-accent2 p-6 max-md:mt-32 max-md:flex-col max-md:gap-16 max-md:p-2 max-md:pb-20 max-md:pt-16"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <button
            className="absolute right-4 top-4 z-10 h-10 w-10 rounded-full border border-primary text-min font-bold text-primary transition-all duration-150 hover:cursor-pointer hover:bg-accent3"
            onClick={closeModal}
          >
            ✕
          </button>
          <div className="sticky top-6 flex h-fit w-1/3 items-start justify-start px-6 max-md:relative max-md:w-full max-md:px-4">
            <div className="relative aspect-[2/3] h-auto w-full overflow-hidden rounded-2xl max-md:aspect-[4/5]">
              <Image
                src={product.image ?? ""}
                alt={product.name}
                fill
                quality={100}
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
          </div>
          <div className="flex h-fit w-2/3 flex-col px-6 max-md:w-full">
            <div className="flex flex-col">
              <p className="text-para">{product.subbrand}</p>
              <h2 className="font-humane text-[8.5rem] font-semibold uppercase leading-[0.9]">
                {product.name}
              </h2>
              <div className="flex flex-col gap-6">
                <p className="text-para">
                  <span className="font-semibold">Vertical: </span>
                  {product.category}
                </p>
                <div className="flex flex-wrap gap-4 text-para">
                  <span className="font-semibold">USP:</span>
                  <div className="grid w-full grid-cols-2 justify-between gap-2">
                    {product.usp?.split(",").map((usp, index) => (
                      <li key={index} className="w-full text-para font-normal">
                        {usp}
                      </li>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-para">
                  <span className="font-semibold">Ingredients:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients
                      ?.split(",")
                      .map((ingredient, index) => (
                        <p
                          key={index}
                          className="rounded-lg border-[0.5px] border-accent1 px-3 py-1 text-base font-normal text-primary transition-all duration-150 hover:bg-accent1 hover:font-medium hover:text-accent2"
                        >
                          {ingredient}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductOverview;
