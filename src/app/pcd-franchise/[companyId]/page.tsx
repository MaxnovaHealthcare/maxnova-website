"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "../../productcard";
import { useParams } from "next/navigation";
import ProductOverview from "../../product-overview";
import Image from "next/image";

async function getProductData(id: string) {
  const res = await fetch(
    `https://maxnovabackend-38x5s.ondigitalocean.app/api/product/company/${id || ""}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getCompanyData(id: string) {
  const res = await fetch(
    `https://maxnovabackend-38x5s.ondigitalocean.app/api/company/${id || ""}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getCategoryData() {
  const res = await fetch(
    "https://maxnovabackend-38x5s.ondigitalocean.app/api/category",
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function PCDFranchisePage() {
  const { companyId } = useParams();
  const [productData, setProductData] = useState<any[]>([]);
  const [companyData, setCompanyData] = useState<any>(null);
  const [categoryData, setCategoryData] = useState<any[] | null>(null);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [enquireOpen, setEnquireOpen] = useState(false);

  const toggleEnquire = () => {
    setEnquireOpen((prev) => !prev);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const products = await getProductData(companyId as string);
        const company = await getCompanyData(companyId as string);
        const categories = await getCategoryData();
        setProductData(products);
        setCompanyData(company.findCompany);
        setCategoryData(categories);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
    fetchData();
  }, [companyId]);
  console.log(companyData);
  const filteredProducts =
    currentCategory === "all"
      ? productData
      : productData.filter(
          (product) => product.category_name === currentCategory,
        );

  return (
    <main className="bg-prim z-0 flex min-h-screen w-full snap-y flex-col">
      <section className="relative flex h-screen min-h-screen w-full flex-col items-center justify-center overflow-hidden p-12 px-6 lg:mt-10 lg:p-12">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-accent1">
          <h1 className="text-center font-humane font-bold max-md:text-8xl lg:text-max">
            {companyData && companyData.name}
          </h1>
          <div className="absolute left-1/2 top-1/2 h-fit w-fit max-w-[50%]">
            <Image
              src={companyData?.image ?? ""}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <section className="flex min-h-screen flex-col items-center justify-center gap-24 p-12">
        <h1 className="text-center font-humane font-bold capitalize max-md:text-8xl lg:text-max">
          Products
        </h1>
        <div className="flex h-fit w-full items-center justify-between p-4">
          <h1 className="text-head font-medium">
            {currentCategory === "all"
              ? "All Products"
              : `All Products for ${currentCategory}`}
          </h1>
          <select
            defaultValue="all"
            className="bg-prim rounded-xl border border-accent1 px-4 py-3"
            onChange={(e) => setCurrentCategory(e.target.value)}
          >
            <option className="w-full bg-none px-12" value="all">
              All Categories
            </option>
            {Array.isArray(categoryData) &&
              categoryData.map((category: any, index: number) => (
                <option
                  className="w-full bg-none px-12 text-5xl"
                  key={index}
                  value={category.name}
                >
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <ProductGrid productData={filteredProducts} />
      </section>
      <ProductOverview />
    </main>
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
