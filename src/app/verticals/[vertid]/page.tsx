"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CTAButtons from "../../buttons";
import WhyUS from "../../whyus";
import Image from "next/image";

const Hero = ({ image, naam }: { image: string; naam: string }) => {
  return (
    <section className="bg-prim flex h-screen min-h-screen w-full flex-col items-center justify-center p-12 px-6 max-md:mt-16 max-md:min-h-[75vh] max-md:p-4 lg:mt-10">
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-accent1 text-primary">
        <Image
          src={image}
          alt={naam}
          fill
          className="absolute h-full w-full object-cover brightness-[0.75] filter"
        />

        <h1 className="z-[1] w-fit font-humane font-bold uppercase max-md:text-8xl lg:text-max">
          {naam ? naam : "Vertical Name"}
        </h1>
      </div>
    </section>
  );
};

const Desc = ({ text, naam }: { text: string; naam: string }) => {
  return (
    <section className="flex flex-col items-start justify-start p-6 px-0 py-12">
      <div className="z-[1] flex w-full flex-col items-center justify-center gap-4 max-md:px-4">
        <h1 className="text-center font-humane font-bold max-md:text-8xl lg:text-max">
          HOW DOES IT WORK?
        </h1>
        <p className="w-4/5 text-center text-para">
          {!text
            ? `this is about ${naam}`
            : text.split("|").map((para, index) => (
                <React.Fragment key={index}>
                  {para}
                  <br />
                </React.Fragment>
              ))}
        </p>
      </div>
    </section>
  );
};

const CategoryProducts = ({ categories }: { categories: any[] }) => {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center gap-12">
      <h1 className="text-center font-humane text-max font-bold uppercase">
        Our Products <br /> in this Category
      </h1>
      {categories.length > 0 ? (
        categories.map(
          (category) =>
            category.products.length > 0 && (
              <CategoryList
                key={category.name}
                heading={category.name}
                products={category.products}
              />
            ),
        )
      ) : (
        <p className="text-para">No products available in this category.</p>
      )}
      <CTAButtons cta="/pcd-franchise" text="View Products"></CTAButtons>
    </section>
  );
};

const CategoryList = ({
  heading,
  products,
}: {
  heading: string;
  products: any[];
}) => {
  if (products.length === 0) return null;

  return (
    <div className="flex h-fit w-full items-start border-b border-accent1 py-12">
      <div className="sticky top-12 flex min-h-[24rem] w-1/5 items-center justify-start px-4">
        <h1 className="text-wrap font-humane text-9xl font-extralight uppercase">
          {heading}
        </h1>
      </div>
      <div className="grid h-fit w-4/5 grid-cols-3 items-start justify-between gap-6 border-l border-accent1 px-4">
        {products.map((product) => (
          <ListCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ListCard = ({ product }: { product: any }) => {
  return (
    <div className="flex h-[24rem] w-full flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl border border-accent1 px-4 py-4">
      <p className="text-subhead">{product.name}</p>
      <div className="flex h-full w-full flex-col items-start justify-start gap-2 text-left text-para">
        {product.features.map((feature: string, index: number) => (
          <li key={index}>{feature}</li>
        ))}
      </div>
    </div>
  );
};

async function fetchAllCategories() {
  const res = await fetch(`http://localhost:4000/api/category`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}

async function fetchSubcategories() {
  const res = await fetch(`http://localhost:4000/api/subcategory`);
  if (!res.ok) {
    throw new Error("Failed to fetch subcategories");
  }
  return res.json();
}

async function fetchSubproducts() {
  const res = await fetch(`http://localhost:4000/api/subproduct`);
  if (!res.ok) {
    throw new Error("Failed to fetch subproducts");
  }
  return res.json();
}

export default function VertTemplate() {
  const { vertid } = useParams() as { vertid: string };
  const [vertical, setVertical] = useState<any>(null);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [groupedSubcategories, setGroupedSubcategories] = useState<any[]>([]);

  useEffect(() => {
    if (vertid) {
      const fetchData = async () => {
        try {
          const categoriesData = await fetchAllCategories();
          const selectedVertical = categoriesData.allCategory.find(
            (category: any) => category._id === vertid,
          );
          setVertical(selectedVertical);

          const subcategoriesData = await fetchSubcategories();
          const subproductsData = await fetchSubproducts();

          const filteredProducts = subproductsData.subproducts.filter(
            (product: any) => product.category._id === vertid,
          );
          setFilteredProducts(filteredProducts);

          const subcategoryProductMap = subcategoriesData.subcategories.map(
            (subcategory: any) => {
              return {
                name: subcategory.name,
                products: filteredProducts.filter(
                  (product: any) => product.subcategory._id === subcategory._id,
                ),
              };
            },
          );

          setGroupedSubcategories(subcategoryProductMap);
          console.log("Selected Vertical:", subcategoryProductMap);
          console.log("Filtered Products:", filteredProducts);
          console.log(
            "Grouped Products by Subcategory:",
            subcategoryProductMap,
          );
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [vertid]);

  if (!vertical) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-24">
      <Hero naam={vertical.name} image={vertical.image} />
      <Desc text={vertical.description} naam={vertical.name} />
      <CategoryProducts categories={groupedSubcategories} />
      <WhyUS />
    </main>
  );
}
