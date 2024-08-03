"use client";

import React from "react";
import ProductCard from "../productcard";

export default function ProductOverview() {
  return (
    <section className="flex min-h-screen w-screen flex-col gap-12 px-6 py-12 md:px-24">
      <div className="flex items-center justify-end">
        <h1 className="w-1/2 text-right font-humane text-max font-bold uppercase">
          THESE ARE TOP MARKET PRODUCTS
        </h1>
      </div>
      <ProductCard />
    </section>
  );
}
