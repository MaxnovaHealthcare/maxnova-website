"use client";

import React from "react";
import Image from "next/image";

export default function Certification() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center gap-6">
      <div className="flex w-1/2 flex-col items-center justify-center gap-4">
        <h1 className="text-center font-humane text-max font-bold">
          YOU CAN TRUST ON US WE ARE AUTHENTIC
        </h1>
      </div>
      <div className="grid h-full grid-cols-2 grid-rows-subgrid gap-24">
        <CertificateCard />
        <CertificateCard />
      </div>
    </section>
  );
}

function CertificateCard() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <Image
        src=""
        alt="certificate"
        className="h-[32rem] w-full rounded-3xl bg-accent1"
      />
      <h1 className="w-4/5 text-center text-head font-semibold">
        ceritficate of blah blah blah
      </h1>
    </div>
  );
}
