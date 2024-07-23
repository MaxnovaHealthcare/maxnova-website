"use client";

import React from "react";
import Image from "next/image";
import footerbg from "../../../public/images/footerbg.png";

export default function PCDFranchisePage() {
  return (
    <main className="-z-10 flex min-h-screen w-screen snap-y flex-col">
      <section className="bg-prim flex h-screen min-h-screen w-screen flex-col items-center justify-center p-12 px-6 md:mt-10 md:p-12">
        <div className="relative flex h-full w-full items-center justify-center rounded-3xl bg-accent1">
          <h1 className="text-center font-humane text-max font-bold">
            PRODUCTS THAT <br /> CAPTURE THE MARKET
          </h1>
        </div>
      </section>
      <section className="bg-prim flex min-h-screen flex-col items-center justify-center p-12">
        <h1 className="text-center font-humane text-max font-bold">
          OUR BRANDS
        </h1>
        <div className="flex h-fit w-full flex-col items-center justify-between -space-y-48 px-24">
          {brands.map((brand, index) => (
            <React.Fragment key={index}>
              {index % 2 === 0 ? (
                <div className="flex w-full items-center justify-end">
                  <BrandsCards
                    src={brand.src}
                    alt={brand.alt}
                    name={brand.name}
                  />
                </div>
              ) : (
                <div className="flex w-full items-center justify-start">
                  <BrandsCards
                    src={brand.src}
                    alt={brand.alt}
                    name={brand.name}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
    </main>
  );
}

const brands = [
  {
    src: { footerbg },
    alt: "Brand 1",
    name: "Brand1",
  },
  {
    src: { footerbg },
    alt: "Brand 2",
    name: "Brand2",
  },
  {
    src: { footerbg },
    alt: "Brand 3",
    name: "Brand3",
  },
  {
    src: { footerbg },
    alt: "Brand 4",
    name: "Brand4",
  },
];

function BrandsCards(props: any) {
  return (
    <div className="flex h-[48rem] w-[28rem] flex-col items-center justify-between gap-12">
      <div className="h-full w-full rounded-3xl bg-accent2">
        <Image
          src={props.src}
          alt={props.alt}
          className="h-full w-full rounded-3xl"
        />
      </div>
      <h1 className="font-humane text-max font-bold capitalize">
        {props.name}
      </h1>
    </div>
  );
}
