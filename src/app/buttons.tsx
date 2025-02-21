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
      className={`h-fit w-fit rounded-full bg-accent2 px-6 py-3 text-[1.1rem] font-medium capitalize text-primary`}
      href={cta}
    >
      {text}
    </Link>
  );
};

export default CTAButtons;
