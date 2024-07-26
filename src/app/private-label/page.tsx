"use client";

import React from "react";
import HorizontalScrollCarousel from "./horizontal-scroll";
import CTAButtons from "../buttons";

export default function PrivateLabelPage() {
  return (
    <main className="-z-10 flex min-h-screen w-screen snap-y flex-col">
      <section className="bg-prim flex h-screen min-h-screen w-screen flex-col items-center justify-center p-12 px-6 md:mt-10 md:p-12">
        <div className="relative flex h-full w-full items-center justify-center rounded-3xl bg-accent1">
          <h1 className="text-center font-humane text-max font-bold">
            ENTER THE MARKET WITH <br /> ONE-OF-A-KIND PRODUCTS
          </h1>
        </div>
      </section>
      <section className="bg-prim flex min-h-screen flex-col items-start justify-start p-12 px-0">
        <div className="z-10 flex w-full flex-col items-center justify-center">
          <h1 className="font-humane text-max font-semibold">
            HOW DOES IT WORK?
          </h1>
          <p className="w-1/2 text-center text-para">
            Private label manufacturing process -: From product selection to the
            final order, our entire process of private label is created keeping
            the benefits and overall growth of our clients as the core focus.
          </p>
          <CTAButtons
            cta="../contact"
            text="Enquire Now"
            bgcolor="bg-accent1"
          />
        </div>
        <HorizontalScrollCarousel />
      </section>
    </main>
  );
}
