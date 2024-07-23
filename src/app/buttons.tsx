"use client";

import React from "react";
import Link from "next/link";

interface CTAButtonsProps {
  cta: string;
  text: string;
  bgcolor: string;
}

export default function CTAButtons({ cta, text, bgcolor }: CTAButtonsProps) {
  return (
    <Link
      className={`h-fit w-fit rounded-full px-4 py-3 text-min ${bgcolor}`}
      href={cta}
    >
      {text}
    </Link>
  );
}
