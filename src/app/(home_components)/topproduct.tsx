"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import ProductCard from "../productcard";

async function getProductData(id: string) {
  try {
    const res = await fetch(`http://localhost:4000/api/product/${id || ""}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    const data = await res.json();
    return data.findProduct;
  } catch (error) {
    console.error("Error in getProductData:", error);
    return null;
  }
}

export default function ProductOverview() {
  const [productData, setProductData] = useState<any[]>([]);
  const [enquireOpen, setEnquireOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductData(id as string);
        if (data) {
          const filteredData = data.filter((product: any) => product.is_top);
          console.log("Filtered data:", filteredData);
          setProductData(filteredData);
        } else {
          console.error("No data returned from getProductData");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [id]);

  const toggleEnquire = () => {
    setEnquireOpen((prev) => !prev);
  };

  return (
    <section className="flex min-h-screen w-full flex-col gap-12 p-12 max-md:p-4 max-md:px-0 px-10">
      <div className="flex items-center justify-end">
        <motion.h1
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.5,
            duration: 0.75,
            ease: "linear",
          }}
          className="w-1/2 text-right font-humane text-max font-bold uppercase max-md:w-full max-md:text-center max-md:text-8xl"
        >
          THESE ARE TOP MARKET PRODUCTS
        </motion.h1>
      </div>
      <ProductGrid productData={productData} />
    </section>
  );
}

function ProductGrid({ productData }: { productData: any[] }) {
  if (productData.length === 0) {
    return (
      <h1 className="text-center font-helvetica text-head font-semibold">
        No products as of Now <br />
        We are working hard on this one!
      </h1>
    );
  }

  return (
    <div className="grid h-fit w-full grid-cols-3 items-center justify-between gap-4 px-12">
      {productData.map((product, index) => (
        <div
          key={index}
          className="flex h-fit w-full items-center justify-center"
        >
          <ProductCard
            name={product.name}
            subbrand={product.company_name}
            category={product.category_name}
            image={product.image}
            ingredients={product.ingredients}
            usp={product.usp}
          />
        </div>
      ))}
    </div>
  );
}
