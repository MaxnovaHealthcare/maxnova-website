"use client";

import React from "react";
import Link from "next/link";

export default function ContactPage(props: any) {
  const HandelOnClick = () => {
    props.onClick();
  };
  return (
    <main
      className={`absolute top-0 bg-secondary bg-opacity-35 p-20 pb-16 pt-24 backdrop-blur-md md:h-screen md:w-screen ${props.className}`}
    >
      <section className="bg-seco flex h-full w-full items-center justify-between rounded-3xl p-12">
        <div className="flex w-1/4 flex-col items-start justify-start gap-6">
          <div className="flex h-full w-full flex-col gap-2">
            <h1 className="text-min font-semibold">Contact Us</h1>
            <h1 className="font-humane text-max font-semibold">
              WHERE DO WE START?
            </h1>
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-2">
            <h1 className="text-min font-semibold">Where</h1>
            <p className="text-base">
              MAXNOVA HEALTHCARE Ambala Chandigarh Expy, Baldev Nagar, Ambala
              City, Haryana 134007{props.address}
            </p>
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-2">
            <h1 className="text-min font-semibold">Phone no.</h1>
            <p className="text-base">
              +91 9034061629{props.numb1} <br />
              +91 9728461626{props.numb2}
            </p>
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-2">
            <h1 className="text-min font-semibold">Mail to:</h1>
            <Link
              href={"mailto:" + props.mail}
              className="text-base underline underline-offset-4"
            >
              gm@maxnovahealthcare.com{props.mail}
            </Link>
          </div>
        </div>
        <div className="flex w-1/2 flex-col items-start justify-start gap-6">
          <form></form>
        </div>
      </section>
    </main>
  );
}
