"use client";

import React from "react";
import Link from "next/link";

interface CTAButtonsProps {
  text: string;
  onClick?: () => any;
  cta: string;
}

const CTAButtons: React.FC<CTAButtonsProps> = ({ text, onClick, cta }) => {
  return (
    <Link
      onClick={onClick}
      className={`h-fit w-fit rounded-3xl bg-accent1 px-4 py-3 text-min font-normal capitalize text-primary`}
      href={cta}
    >
      {text}
    </Link>
  );
};

export default CTAButtons;
