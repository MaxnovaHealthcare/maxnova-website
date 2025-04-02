"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "../../productcard";
import { useParams } from "next/navigation";
import ProductOverview from "../../product-overview";
import Image from "next/image";
import { Download } from "lucide-react";

const fetchData = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch data from ${url}`);
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function PCDFranchisePage() {
  const { companyId } = useParams<{ companyId: string }>();
  const [productData, setProductData] = useState<any[]>([]);
  const [companyData, setCompanyData] = useState<any>(null);
  const [categoryData, setCategoryData] = useState<any[] | null>(null);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [enquireOpen, setEnquireOpen] = useState(false);

  useEffect(() => {
    if (!companyId) return;

    const fetchAllData = async () => {
      try {
        const [products, company, categories] = await Promise.all([
          fetchData(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/api/product/company/${companyId}`,
          ),
          fetchData(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/api/company/${companyId}`,
          ),
          fetchData(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/category`),
        ]);

        if (products) setProductData(products);
        if (company) setCompanyData(company.findCompany);
        if (categories) setCategoryData(categories.allCategory);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchAllData();
  }, [companyId]);

  const filteredProducts =
    currentCategory === "all"
      ? productData
      : productData.filter(
          (product) =>
            product.category_name?.toLowerCase() ===
            currentCategory.toLowerCase(),
        );

  return (
    <main className="bg-prim z-0 flex min-h-screen w-full snap-y flex-col">
      <section className="relative flex h-screen min-h-screen w-full flex-col items-center justify-center overflow-hidden p-12 px-6 lg:mt-10 lg:p-12">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-accent1">
          <div className="absolute aspect-square h-auto w-[32rem] overflow-visible max-md:w-[16rem]">
            <Image
              src={companyData?.image ?? ""}
              alt={companyData?.name}
              fill
              quality={100}
              className="object-contain"
            />
          </div>
        </div>
      </section>
      <section className="flex h-fit min-h-[50vh] w-full flex-col items-center justify-start p-4 py-24">
        <h1 className="text-center font-humane font-bold uppercase max-md:text-8xl lg:text-max">
          What is {companyData?.name}?
        </h1>
        <p className="w-4/5 text-center font-helvetica text-para max-md:w-full">
          {companyData?.description}
        </p>
      </section>
      <section className="flex min-h-screen flex-col items-center justify-center gap-6 md:gap-24">
        <h1 className="text-center font-humane font-bold uppercase max-md:text-8xl lg:text-max">
          Products
        </h1>
        <div className="flex h-fit w-full items-center justify-between px-12 max-md:flex-col max-md:gap-4 max-md:px-4">
          <h1 className="w-full text-head font-medium">
            {currentCategory === "all"
              ? "All Products"
              : `All Products for ${currentCategory}`}
          </h1>
          <div className="flex w-full items-center justify-around gap-4 md:justify-end md:gap-4">
            <a
              href={companyData?.catalog || "#"}
              download
              className={`flex items-center justify-center gap-2 rounded-full bg-accent2 px-6 py-3 text-sm text-primary md:text-base ${
                !companyData?.catalog ? "pointer-events-none opacity-50" : ""
              }`}
            >
              Get Catalog <Download size={20} />
            </a>
            <select
              defaultValue="all"
              className="bg-prim flex items-center justify-center rounded-full border border-accent1 px-4 py-3 text-sm md:text-base"
              onChange={(e) => setCurrentCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {Array.isArray(categoryData) &&
                categoryData.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <ProductGrid productData={filteredProducts} />
      </section>
      <ProductOverview />
    </main>
  );
}

const ProductGrid: React.FC<{ productData: any[] }> = ({ productData }) =>
  productData.length === 0 ? (
    <h1 className="text-center font-helvetica text-head font-semibold">
      No products as of now <br /> We are working hard on this one!
    </h1>
  ) : (
    <div className="grid h-fit w-full grid-cols-3 items-center justify-between gap-12 max-md:grid-cols-2 max-md:gap-8 max-md:px-2">
      {productData.map((product, index) => (
        <div
          key={index}
          className="col-span-1 flex h-fit w-full items-center justify-center"
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
