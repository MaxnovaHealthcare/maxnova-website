"use client";

import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "next/navigation";
import MarqueeEffect from "../../marquee";
import CTAButtons from "../../buttons";
import Image from "next/image";
import Link from "next/link";

// Type Definitions
interface Product {
  _id: string;
  name: string;
  features: string[];
  category: { _id: string };
  subcategory: { _id: string };
}

interface Subcategory {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  name: string;
  image: string;
  description: string;
  slogan: string;
  bentoimage: string;
}

interface GroupedSubcategory {
  name: string;
  products: Product[];
}

// Fetch Functions
const fetchData = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch data from ${ url }`);
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Hero Component
const Hero: React.FC<{ image: string; naam: string }> = ({ image, naam }) => (
  <section className="bg-prim flex h-screen min-h-screen w-full flex-col items-center justify-center p-12 px-6 max-md:mt-16 max-md:min-h-[75vh] max-md:p-4 lg:mt-10">
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-accent1 text-primary">
      <Image
        src={ image }
        alt={ naam }
        fill
        quality={ 100 }
        className="absolute h-full w-full object-cover brightness-[0.75] filter"
      />
      <h1 className="z-[1] w-fit font-humane font-bold uppercase text-primary max-md:text-8xl lg:text-max">
        { naam || "Vertical Name" }
      </h1>
    </div>
  </section>
);

// Description Component
const Desc: React.FC<{ text: string; naam: string }> = ({ text, naam }) => (
  <section className="flex flex-col items-start justify-start p-6 px-0 py-12">
    <div className="z-[1] flex w-full flex-col items-center justify-center gap-4 max-md:px-4">
      <h1 className="text-center font-humane font-bold uppercase text-accent2 max-md:text-8xl lg:text-max">
        Understanding { naam }
      </h1>
      <p className="w-4/5 text-center text-para max-md:w-full">
        { text
          ? text.split("|").map((para, index) => (
            <Fragment key={ index }>
              { para }
              <br />
            </Fragment>
          ))
          : `This is about ${ naam }` }
      </p>
    </div>
  </section>
);

// Category Products Component
const CategoryProducts: React.FC<{ categories: GroupedSubcategory[] }> = ({
  categories,
}) => (
  <section className="flex min-h-screen w-full flex-col items-center justify-center gap-12">
    <h1 className="text-center font-humane text-max font-bold uppercase text-accent2 max-md:text-8xl max-md:leading-[0.9]">
      Our Products <br /> in this Category
    </h1>
    { categories.length > 0 ? (
      categories.map(
        ({ name, products }) =>
          products.length > 0 && (
            <CategoryList key={ name } heading={ name } products={ products } />
          ),
      )
    ) : (
      <p className="text-para">No products available in this category.</p>
    ) }
    <CTAButtons cta="/pcd-franchise" text="View Products" />
  </section>
);

const CategoryList: React.FC<{ heading: string; products: Product[] }> = ({
  heading,
  products,
}) =>
  products.length > 0 && (
    <div className="flex h-fit w-full items-start border-b border-accent1 py-12 max-md:flex-col">
      <div className="sticky top-12 flex min-h-[24rem] w-1/5 items-center justify-start px-4 max-md:top-16 max-md:h-fit max-md:min-h-0 max-md:w-full max-md:items-center max-md:justify-center max-md:border-b-2 max-md:border-accent1 max-md:bg-primary max-md:py-4">
        <h1 className="text-pretty text-center font-humane text-8xl font-extralight uppercase">
          { heading }
        </h1>
      </div>
      <div className="grid h-fit w-4/5 grid-cols-3 items-start justify-between gap-6 border-l border-accent1 px-4 max-md:w-full max-md:grid-cols-1 max-md:border-0">
        { products.map((product) => (
          <ListCard key={ product._id } product={ product } />
        )) }
      </div>
    </div>
  );

const ListCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="flex h-[24rem] w-full flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl border border-accent1 px-4 py-4">
    <p className="text-subhead max-md:text-xl">{ product.name }</p>
    <ul className="flex h-full w-full flex-col items-start justify-start gap-2 text-left text-para max-md:text-min">
      { product.features.map((feature, index) => (
        <li key={ index }>{ feature }</li>
      )) }
    </ul>
  </div>
);

// Vertical Bento Component
const VerticalBento: React.FC<{
  allverticals: Category[];
  currentvert: Category;
  categories: GroupedSubcategory[];
}> = ({ allverticals, currentvert, categories }) => {
  const directions: ("right" | "left")[] = ["right", "left", "right", "left"];
  return (
    <section className="grid h-fit min-h-[45rem] w-full grid-cols-2 grid-rows-2 items-center justify-center gap-[1rem] px-12 max-md:grid-cols-1 max-md:grid-rows-4 max-md:px-2">
      <div className="relative col-span-1 row-span-2 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl px-4 py-8 text-primary max-md:col-span-2">
        <h1 className="z-[1] flex flex-col gap-2 font-humane text-max font-bold uppercase max-md:text-9xl max-md:leading-[0.9]">
          <span className="font-helvetica text-para font-normal capitalize max-md:text-min">
            We Offer You
          </span>
          an extensive product range
        </h1>
        <Link
          href={ `/verticals/${ currentvert._id }/#productcategory` }
          className="z-[1] flex w-fit items-center justify-center bg-accent2/75 text-nowrap rounded-full border border-primary px-4 py-4 text-para font-semibold text-primary transition-colors"
        >
          Our Product Categories
        </Link>
        <Image
          src={ currentvert.bentoimage }
          fill
          quality={ 100 }
          alt="box1_image"
          className="absolute right-0 top-0 h-full w-full bg-accent1 object-cover brightness-90 filter"
        />
      </div>
      <div className="relative col-span-1 row-span-1 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-accent2 max-md:col-span-2 max-md:row-span-1">
        <div className="absolute left-0 top-0 z-[1] flex h-full w-full flex-col items-start justify-end gap-1 bg-gradient-to-t from-[#97BBD1] from-[5%] to-transparent px-4 py-4">
          <p className="text-para font-normal text-primary">
            { currentvert.name }:
          </p>
          <h1 className="font-humane text-[6rem] font-bold uppercase leading-[0.9] text-primary max-md:text-7xl max-md:leading-[0.9]">
            { currentvert.slogan }
          </h1>
        </div>
        { directions.map((direction, index) => (
          <MarqueeEffect key={ index } direction={ direction } speed={ 5 }>
            { categories.map(({ name }) => (
              <h1
                key={ name }
                className="font-humane text-[5rem] font-semibold uppercase leading-[1] text-accent1"
              >
                { name }
              </h1>
            )) }
          </MarqueeEffect>
        )) }
      </div>
      <div className="col-span-1 row-span-1 flex h-full w-full flex-col items-start justify-between rounded-2xl border-2 border-accent2 p-4 max-md:col-span-2 max-md:row-span-1">
        <h2 className="text-wrap font-humane text-[6rem] font-bold uppercase leading-[0.9] text-accent2 max-md:text-7xl max-md:leading-[0.9]">
          Other Verticals
        </h2>
        <div className="grid h-fit w-full grid-cols-2 items-center justify-between gap-4">
          { allverticals.map((vertical) =>
            vertical._id !== currentvert._id ? (
              <Link
                href={ `/verticals/${ vertical._id }` }
                key={ vertical._id }
                className="col-span-1 flex w-fit items-center justify-center text-nowrap rounded-full bg-accent2 px-4 py-3 text-para font-semibold text-primary transition-colors max-md:col-span-1 max-md:w-full max-md:text-xs md:mt-0 md:w-auto"
              >
                { vertical.name }
              </Link>
            ) : null,
          ) }
          <Link
            href={ `/#verticals` }
            className="col-span-1 flex w-full items-center justify-center text-nowrap rounded-full border border-accent2 px-4 py-3 text-para font-semibold text-accent2 transition-colors max-md:w-full max-md:text-xs"
          >
            View All Verticals
          </Link>
        </div>
      </div>
    </section>
  );
};

const VertTemplate: React.FC = () => {
  const { vertid } = useParams<{ vertid: string }>();
  const [allvert, setAllvert] = useState<Category[]>([]);
  const [vertical, setVertical] = useState<Category | null>(null);
  const [groupedSubcategories, setGroupedSubcategories] = useState<
    GroupedSubcategory[]
  >([]);

  useEffect(() => {
    if (!vertid) return;
    const fetchVerticalData = async () => {
      try {
        const [categoriesData, subcategoriesData, subproductsData, allbento] =
          await Promise.all([
            fetchData(`${ process.env.NEXT_PUBLIC_BACKEND_API }/api/category`),
            fetchData(`${ process.env.NEXT_PUBLIC_BACKEND_API }/api/subcategory`),
            fetchData(`${ process.env.NEXT_PUBLIC_BACKEND_API }/api/subproduct`),
            fetchData(
              `${ process.env.NEXT_PUBLIC_BACKEND_API }/api/utils/get-bento`,
            ),
          ]);

        if (!categoriesData || !subcategoriesData || !subproductsData) return;

        setAllvert(categoriesData.allCategory);
        const selectedVertical = categoriesData.allCategory.find(
          (category: Category) => category._id === vertid,
        );
        if (!selectedVertical) return;
        setVertical(selectedVertical);

        const filteredProducts = subproductsData.subproducts.filter(
          (product: Product) => product.category._id === vertid,
        );
        const subcategoryProductMap = subcategoriesData.subcategories.map(
          (subcategory: Subcategory) => ({
            name: subcategory.name,
            products: filteredProducts.filter(
              (product: Product) => product.subcategory._id === subcategory._id,
            ),
          }),
        );

        setGroupedSubcategories(subcategoryProductMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchVerticalData();
  }, [vertid]);
  if (!vertical) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-24">
      <Hero naam={ vertical.name } image={ vertical.image } />
      <Desc text={ vertical.description } naam={ vertical.name } />
      <VerticalBento
        allverticals={ allvert }
        currentvert={ vertical }
        categories={ groupedSubcategories }
      />
      <div id="productcategory" className="h-fit w-full">
        <CategoryProducts categories={ groupedSubcategories } />
      </div>
    </main>
  );
};

export default VertTemplate;
